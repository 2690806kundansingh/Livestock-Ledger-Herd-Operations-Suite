// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/service/AnimalService.java
package com.farmoperations.livestock.service;

import com.farmoperations.livestock.dto.*;
import com.farmoperations.livestock.entity.Animal;
import com.farmoperations.livestock.entity.LifeEvent;
import com.farmoperations.livestock.model.AnimalStatus;
import com.farmoperations.livestock.model.LifeEventType;
import com.farmoperations.livestock.repository.AnimalRepository;
import com.farmoperations.livestock.repository.LifeEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final LifeEventRepository lifeEventRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final WebSocketHeadcountBroadcaster headcountBroadcaster;

    @Value("${app.kafka.topics.animal-events:animal.events}")
    private String animalEventsTopic;

    @Transactional(readOnly = true)
    public List<AnimalResponse> getAllAnimals(AnimalStatus status) {
        List<Animal> animals = (status != null)
                ? animalRepository.findByStatus(status)
                : animalRepository.findAll();

        return animals.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AnimalResponse getAnimalById(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal not found with ID: " + id));
        return mapToResponse(animal);
    }

    @Transactional
    public AnimalResponse registerBirthOrAcquisition(AnimalCreateRequest request) {
        log.info("Registering animal with tag number: {}", request.getTagNumber());

        if (animalRepository.findByTagNumber(request.getTagNumber()).isPresent()) {
            throw new IllegalArgumentException("Animal with tag number " + request.getTagNumber() + " already exists");
        }

        Animal animal = Animal.builder()
                .tagNumber(request.getTagNumber())
                .species(request.getSpecies())
                .status(request.getStatus() != null ? request.getStatus() : AnimalStatus.ACTIVE)
                .penLocation(request.getPenLocation())
                .weightKg(request.getWeightKg())
                .birthDate(request.getBirthDate())
                .acquisitionCost(request.getAcquisitionCost())
                .build();

        Animal savedAnimal = animalRepository.save(animal);

        // Record Initial Life Event
        LifeEvent birthEvent = LifeEvent.builder()
                .animalId(savedAnimal.getId())
                .eventType(LifeEventType.BIRTH)
                .details("Registered into herd registry. Species: " + savedAnimal.getSpecies() + ", Initial Pen: " + savedAnimal.getPenLocation())
                .recordedBy("SYSTEM_REGISTRY")
                .eventTimestamp(LocalDateTime.now())
                .build();
        lifeEventRepository.save(birthEvent);

        // Push live headcount delta over WebSocket
        broadcastCurrentHeadcount();

        return mapToResponse(savedAnimal);
    }

    @Transactional
    public LifeEventResponse recordMortality(Long animalId, String causeOfDeath, String recordedBy) {
        log.warn("Recording mortality event for animal ID: {}, Cause: {}", animalId, causeOfDeath);

        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new IllegalArgumentException("Animal not found with ID: " + animalId));

        animal.setStatus(AnimalStatus.DECEASED);
        animalRepository.save(animal);

        // Persist Life Event
        LifeEvent event = LifeEvent.builder()
                .animalId(animalId)
                .eventType(LifeEventType.MORTALITY)
                .details("Mortality recorded. Cause: " + causeOfDeath)
                .recordedBy(recordedBy)
                .eventTimestamp(LocalDateTime.now())
                .build();
        LifeEvent savedEvent = lifeEventRepository.save(event);

        // Dispatch to Kafka topic animal.events
        AnimalEvent kafkaEvent = AnimalEvent.builder()
                .eventId(UUID.randomUUID().toString())
                .eventType("MORTALITY")
                .animalId(animal.getId())
                .tagNumber(animal.getTagNumber())
                .penLocation(animal.getPenLocation())
                .reason(causeOfDeath)
                .timestamp(LocalDateTime.now())
                .build();

        kafkaTemplate.send(animalEventsTopic, animal.getTagNumber(), kafkaEvent);
        log.info("Dispatched mortality event to Kafka topic {}: {}", animalEventsTopic, kafkaEvent);

        // Push live headcount delta over WebSocket
        broadcastCurrentHeadcount();

        return mapToLifeEventResponse(savedEvent);
    }

    @Transactional
    public LifeEventResponse transferPen(Long animalId, String newPenLocation, String recordedBy) {
        log.info("Transferring animal ID: {} to pen: {}", animalId, newPenLocation);

        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new IllegalArgumentException("Animal not found with ID: " + animalId));

        String oldPen = animal.getPenLocation();
        animal.setPenLocation(newPenLocation);
        animalRepository.save(animal);

        LifeEvent event = LifeEvent.builder()
                .animalId(animalId)
                .eventType(LifeEventType.TRANSFER)
                .details("Pen transfer from '" + oldPen + "' to '" + newPenLocation + "'")
                .recordedBy(recordedBy)
                .eventTimestamp(LocalDateTime.now())
                .build();
        LifeEvent savedEvent = lifeEventRepository.save(event);

        return mapToLifeEventResponse(savedEvent);
    }

    @Transactional
    public LifeEventResponse recordTreatment(Long animalId, String treatmentNotes, String recordedBy) {
        log.info("Recording treatment for animal ID: {}", animalId);

        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new IllegalArgumentException("Animal not found with ID: " + animalId));

        // When receiving treatment, place into QUARANTINE if currently ACTIVE
        if (animal.getStatus() == AnimalStatus.ACTIVE) {
            animal.setStatus(AnimalStatus.QUARANTINE);
            animalRepository.save(animal);
            broadcastCurrentHeadcount();
        }

        LifeEvent event = LifeEvent.builder()
                .animalId(animalId)
                .eventType(LifeEventType.TREATMENT)
                .details("Veterinary Treatment: " + treatmentNotes)
                .recordedBy(recordedBy)
                .eventTimestamp(LocalDateTime.now())
                .build();
        LifeEvent savedEvent = lifeEventRepository.save(event);

        return mapToLifeEventResponse(savedEvent);
    }

    @Transactional
    public LifeEventResponse recordSale(Long animalId, Double salePrice, String recordedBy) {
        log.info("Recording sale for animal ID: {}, price: {}", animalId, salePrice);

        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new IllegalArgumentException("Animal not found with ID: " + animalId));

        animal.setStatus(AnimalStatus.SOLD);
        animalRepository.save(animal);

        LifeEvent event = LifeEvent.builder()
                .animalId(animalId)
                .eventType(LifeEventType.SALE)
                .details("Sold at market. Realized value: $" + (salePrice != null ? salePrice : 0.0))
                .recordedBy(recordedBy)
                .eventTimestamp(LocalDateTime.now())
                .build();
        LifeEvent savedEvent = lifeEventRepository.save(event);

        broadcastCurrentHeadcount();

        return mapToLifeEventResponse(savedEvent);
    }

    @Transactional
    public LifeEventResponse processLifeEvent(LifeEventRequest request) {
        return switch (request.getEventType()) {
            case MORTALITY -> recordMortality(
                    request.getAnimalId(),
                    request.getCauseOfDeath() != null ? request.getCauseOfDeath() : request.getDetails(),
                    request.getRecordedBy()
            );
            case TRANSFER -> transferPen(
                    request.getAnimalId(),
                    request.getNewPenLocation() != null ? request.getNewPenLocation() : request.getDetails(),
                    request.getRecordedBy()
            );
            case TREATMENT -> recordTreatment(
                    request.getAnimalId(),
                    request.getTreatmentNotes() != null ? request.getTreatmentNotes() : request.getDetails(),
                    request.getRecordedBy()
            );
            case SALE -> recordSale(
                    request.getAnimalId(),
                    request.getSalePrice(),
                    request.getRecordedBy()
            );
            case BIRTH -> {
                LifeEvent event = LifeEvent.builder()
                        .animalId(request.getAnimalId())
                        .eventType(LifeEventType.BIRTH)
                        .details(request.getDetails())
                        .recordedBy(request.getRecordedBy())
                        .eventTimestamp(request.getEventTimestamp() != null ? request.getEventTimestamp() : LocalDateTime.now())
                        .build();
                yield mapToLifeEventResponse(lifeEventRepository.save(event));
            }
        };
    }

    @Transactional(readOnly = true)
    public List<LifeEventResponse> getAnimalEvents(Long animalId) {
        return lifeEventRepository.findByAnimalIdOrderByEventTimestampDesc(animalId).stream()
                .map(this::mapToLifeEventResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public HeadcountSummaryDto getHeadcountSummary() {
        long total = animalRepository.count();
        long active = animalRepository.countByStatus(AnimalStatus.ACTIVE);
        long quarantine = animalRepository.countByStatus(AnimalStatus.QUARANTINE);
        long sold = animalRepository.countByStatus(AnimalStatus.SOLD);
        long deceased = animalRepository.countByStatus(AnimalStatus.DECEASED);

        // Juveniles defined as animals born within the last 6 months
        LocalDate juvenileCutoff = LocalDate.now().minusMonths(6);
        long juvenile = animalRepository.countJuveniles(AnimalStatus.ACTIVE, juvenileCutoff);

        double mortalityRate = (total > 0) ? ((double) deceased / total) * 100.0 : 0.0;
        mortalityRate = Math.round(mortalityRate * 100.0) / 100.0;

        return HeadcountSummaryDto.builder()
                .totalHeadcount(total)
                .activeCount(active)
                .quarantineCount(quarantine)
                .soldCount(sold)
                .deceasedCount(deceased)
                .juvenileCount(juvenile)
                .mortalityRatePercentage(mortalityRate)
                .calculatedAt(LocalDateTime.now())
                .build();
    }

    public void broadcastCurrentHeadcount() {
        HeadcountSummaryDto summary = getHeadcountSummary();
        headcountBroadcaster.broadcastHeadcount(summary);
    }

    private AnimalResponse mapToResponse(Animal animal) {
        return AnimalResponse.builder()
                .id(animal.getId())
                .tagNumber(animal.getTagNumber())
                .species(animal.getSpecies())
                .status(animal.getStatus())
                .penLocation(animal.getPenLocation())
                .weightKg(animal.getWeightKg())
                .birthDate(animal.getBirthDate())
                .acquisitionCost(animal.getAcquisitionCost())
                .createdAt(animal.getCreatedAt())
                .updatedAt(animal.getUpdatedAt())
                .build();
    }

    private LifeEventResponse mapToLifeEventResponse(LifeEvent event) {
        return LifeEventResponse.builder()
                .id(event.getId())
                .animalId(event.getAnimalId())
                .eventType(event.getEventType())
                .details(event.getDetails())
                .recordedBy(event.getRecordedBy())
                .eventTimestamp(event.getEventTimestamp())
                .build();
    }
}

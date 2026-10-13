// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/config/DataInitializer.java
package com.farmoperations.livestock.config;

import com.farmoperations.livestock.entity.Animal;
import com.farmoperations.livestock.entity.LifeEvent;
import com.farmoperations.livestock.model.AnimalStatus;
import com.farmoperations.livestock.model.LifeEventType;
import com.farmoperations.livestock.repository.AnimalRepository;
import com.farmoperations.livestock.repository.LifeEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AnimalRepository animalRepository;
    private final LifeEventRepository lifeEventRepository;

    @Override
    public void run(String... args) {
        if (animalRepository.count() > 0) {
            log.info("Livestock database already seeded. Skipping initial enrollment.");
            return;
        }

        log.info("Seeding initial herd records into livestock_db...");

        List<Animal> initialAnimals = List.of(
                Animal.builder()
                        .tagNumber("TAG-1011")
                        .species("Black Angus")
                        .status(AnimalStatus.ACTIVE)
                        .penLocation("Pasture 1 - North")
                        .weightKg(460.5)
                        .birthDate(LocalDate.now().minusMonths(14))
                        .acquisitionCost(new BigDecimal("185.00"))
                        .build(),
                Animal.builder()
                        .tagNumber("TAG-1012")
                        .species("Hereford")
                        .status(AnimalStatus.ACTIVE)
                        .penLocation("Pasture 1 - North")
                        .weightKg(445.0)
                        .birthDate(LocalDate.now().minusMonths(12))
                        .acquisitionCost(new BigDecimal("190.00"))
                        .build(),
                Animal.builder()
                        .tagNumber("TAG-1013")
                        .species("Charolais")
                        .status(AnimalStatus.QUARANTINE)
                        .penLocation("Quarantine Barn Q-1")
                        .weightKg(380.0)
                        .birthDate(LocalDate.now().minusMonths(8))
                        .acquisitionCost(new BigDecimal("165.00"))
                        .build(),
                Animal.builder()
                        .tagNumber("TAG-1014")
                        .species("Black Angus")
                        .status(AnimalStatus.ACTIVE)
                        .penLocation("Enclosure 2 - South")
                        .weightKg(120.0)
                        .birthDate(LocalDate.now().minusMonths(3)) // Juvenile
                        .acquisitionCost(new BigDecimal("95.00"))
                        .build(),
                Animal.builder()
                        .tagNumber("TAG-1015")
                        .species("Simmental")
                        .status(AnimalStatus.ACTIVE)
                        .penLocation("Enclosure 2 - South")
                        .weightKg(115.5)
                        .birthDate(LocalDate.now().minusMonths(2)) // Juvenile
                        .acquisitionCost(new BigDecimal("90.00"))
                        .build(),
                Animal.builder()
                        .tagNumber("TAG-1016")
                        .species("Holstein")
                        .status(AnimalStatus.SOLD)
                        .penLocation("Market Pen")
                        .weightKg(510.0)
                        .birthDate(LocalDate.now().minusMonths(22))
                        .acquisitionCost(new BigDecimal("210.00"))
                        .build()
        );

        List<Animal> savedAnimals = animalRepository.saveAll(initialAnimals);

        for (Animal animal : savedAnimals) {
            LifeEvent event = LifeEvent.builder()
                    .animalId(animal.getId())
                    .eventType(LifeEventType.BIRTH)
                    .details("Initial herd inventory enrollment for " + animal.getTagNumber())
                    .recordedBy("SYSTEM_INITIALIZER")
                    .eventTimestamp(LocalDateTime.now())
                    .build();
            lifeEventRepository.save(event);
        }

        log.info("Enrolled {} initial livestock animals.", savedAnimals.size());
    }
}

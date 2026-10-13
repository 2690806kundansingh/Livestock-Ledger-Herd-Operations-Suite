// File: notification-mail-service/src/main/java/com/farmoperations/notification/consumer/AnimalEventsConsumer.java
package com.farmoperations.notification.consumer;

import com.farmoperations.notification.dto.AnimalEventDto;
import com.farmoperations.notification.entity.MortalityIncident;
import com.farmoperations.notification.repository.MortalityIncidentRepository;
import com.farmoperations.notification.service.EmailDispatcherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class AnimalEventsConsumer {

    private final MortalityIncidentRepository mortalityIncidentRepository;
    private final EmailDispatcherService emailDispatcherService;

    @Value("${app.notifications.manager-email:manager@farmoperations.com}")
    private String farmManagerEmail;

    @Value("${app.notifications.mortality-emergency-threshold:3}")
    private int mortalityEmergencyThreshold;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @KafkaListener(topics = "animal.events", groupId = "notification-service-group")
    public void consumeAnimalEvent(AnimalEventDto event) {
        log.info("Received AnimalEvent from Kafka: ID={}, Type={}, Tag={}",
                event.getEventId(), event.getEventType(), event.getTagNumber());

        if (!"MORTALITY".equalsIgnoreCase(event.getEventType())) {
            log.debug("Event type '{}' is not MORTALITY. Skipping emergency mailing.", event.getEventType());
            return;
        }

        // 1. Record mortality incident
        LocalDateTime incidentTime = (event.getTimestamp() != null) ? event.getTimestamp() : LocalDateTime.now();
        MortalityIncident incident = MortalityIncident.builder()
                .tagNumber(event.getTagNumber())
                .penLocation(event.getPenLocation() != null ? event.getPenLocation() : "UNKNOWN")
                .causeOfDeath(event.getReason() != null ? event.getReason() : "Unspecified cause")
                .incidentTimestamp(incidentTime)
                .build();
        mortalityIncidentRepository.save(incident);

        // 2. Count mortalities in rolling 24-hour window
        LocalDateTime cutoff = LocalDateTime.now().minusHours(24);
        long rolling24HrCount = mortalityIncidentRepository.countByIncidentTimestampAfter(cutoff);

        log.warn("Current 24-hour mortality count: {} (Emergency Threshold: {})",
                rolling24HrCount, mortalityEmergencyThreshold);

        // 3. Dispatch high-priority emergency email if threshold met or exceeded
        if (rolling24HrCount >= mortalityEmergencyThreshold) {
            log.error("CRITICAL: Mortality threshold reached! Triggering emergency dispatch to farm manager: {}", farmManagerEmail);

            Map<String, Object> variables = new HashMap<>();
            variables.put("tagNumber", event.getTagNumber());
            variables.put("penLocation", event.getPenLocation() != null ? event.getPenLocation() : "N/A");
            variables.put("causeOfDeath", event.getReason() != null ? event.getReason() : "Unspecified");
            variables.put("timestamp", incidentTime.format(FORMATTER));
            variables.put("rollingCount", rolling24HrCount);
            variables.put("threshold", mortalityEmergencyThreshold);
            variables.put("dashboardUrl", "http://localhost:5173");

            String subject = "🚨 CRITICAL HERD ALERT: 24h Mortality Threshold Exceeded (" + rolling24HrCount + " Casualties)";
            emailDispatcherService.sendHtmlEmail(farmManagerEmail, subject, "mortality-alert", variables);
        }
    }
}

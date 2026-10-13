// File: notification-mail-service/src/main/java/com/farmoperations/notification/consumer/InventoryEventsConsumer.java
package com.farmoperations.notification.consumer;

import com.farmoperations.notification.dto.StockLowEventDto;
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
public class InventoryEventsConsumer {

    private final EmailDispatcherService emailDispatcherService;

    @Value("${app.notifications.procurement-email:procurement@farmoperations.com}")
    private String procurementEmail;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @KafkaListener(topics = "inventory.events", groupId = "notification-service-group")
    public void consumeInventoryEvent(StockLowEventDto event) {
        log.warn("Received StockLowEvent from Kafka for feed '{}': Current={} kg, Threshold={} kg, Runway={} days",
                event.getFeedName(), event.getCurrentQuantityKg(), event.getReorderThresholdKg(), event.getRunwayDaysRemaining());

        LocalDateTime timestamp = (event.getTimestamp() != null) ? event.getTimestamp() : LocalDateTime.now();

        Map<String, Object> variables = new HashMap<>();
        variables.put("feedName", event.getFeedName());
        variables.put("currentQuantity", event.getCurrentQuantityKg());
        variables.put("reorderThreshold", event.getReorderThresholdKg());
        variables.put("runwayDays", event.getRunwayDaysRemaining() != null ? event.getRunwayDaysRemaining() : 0);
        variables.put("timestamp", timestamp.format(FORMATTER));
        variables.put("dashboardUrl", "http://localhost:5173");

        String subject = "⚠️ FEED INVENTORY WARNING: Reorder Required for '" + event.getFeedName() + "'";
        emailDispatcherService.sendHtmlEmail(procurementEmail, subject, "inventory-alert", variables);
    }
}

// File: notification-mail-service/src/main/java/com/farmoperations/notification/controller/NotificationController.java
package com.farmoperations.notification.controller;

import com.farmoperations.notification.dto.TestAlertRequest;
import com.farmoperations.notification.entity.DeliveryLog;
import com.farmoperations.notification.repository.DeliveryLogRepository;
import com.farmoperations.notification.scheduler.WeeklyDigestScheduler;
import com.farmoperations.notification.service.EmailDispatcherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    private final DeliveryLogRepository deliveryLogRepository;
    private final EmailDispatcherService emailDispatcherService;
    private final WeeklyDigestScheduler weeklyDigestScheduler;

    @Value("${app.notifications.manager-email:manager@farmoperations.com}")
    private String defaultManagerEmail;

    @GetMapping("/logs")
    public ResponseEntity<List<DeliveryLog>> getRecentDeliveryLogs() {
        return ResponseEntity.ok(deliveryLogRepository.findTop50ByOrderByDispatchedAtDesc());
    }

    @PostMapping("/test")
    public ResponseEntity<Map<String, Object>> sendTestAlert(@RequestBody(required = false) TestAlertRequest request) {
        String recipient = (request != null && request.getRecipient() != null && !request.getRecipient().isBlank())
                ? request.getRecipient()
                : defaultManagerEmail;

        String type = (request != null && request.getAlertType() != null) ? request.getAlertType().toUpperCase() : "MORTALITY";

        Map<String, Object> variables = new HashMap<>();
        variables.put("tagNumber", (request != null && request.getTagNumber() != null) ? request.getTagNumber() : "TEST-TAG-999");
        variables.put("penLocation", (request != null && request.getPenLocation() != null) ? request.getPenLocation() : "Barn 3 - Pen B");
        variables.put("causeOfDeath", (request != null && request.getDetails() != null) ? request.getDetails() : "Simulated emergency test event");
        variables.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        variables.put("rollingCount", 4);
        variables.put("threshold", 3);
        variables.put("dashboardUrl", "http://localhost:5173");

        String template = type.equalsIgnoreCase("INVENTORY") ? "inventory-alert" : "mortality-alert";
        String subject = "🔔 [TEST DISPATCH] Farm Alert - " + type;

        emailDispatcherService.sendHtmlEmail(recipient, subject, template, variables);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("recipient", recipient);
        response.put("template", template);
        response.put("dispatchedAt", LocalDateTime.now());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/trigger-digest")
    public ResponseEntity<Map<String, String>> triggerWeeklyDigest() {
        weeklyDigestScheduler.executeWeeklyExecutiveDigest();
        return ResponseEntity.ok(Map.of("message", "Weekly executive digest triggered successfully"));
    }
}

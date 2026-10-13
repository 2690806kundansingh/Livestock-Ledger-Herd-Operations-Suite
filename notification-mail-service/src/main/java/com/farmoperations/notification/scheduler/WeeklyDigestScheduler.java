// File: notification-mail-service/src/main/java/com/farmoperations/notification/scheduler/WeeklyDigestScheduler.java
package com.farmoperations.notification.scheduler;

import com.farmoperations.notification.repository.DeliveryLogRepository;
import com.farmoperations.notification.repository.MortalityIncidentRepository;
import com.farmoperations.notification.service.EmailDispatcherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class WeeklyDigestScheduler {

    private final MortalityIncidentRepository mortalityIncidentRepository;
    private final DeliveryLogRepository deliveryLogRepository;
    private final EmailDispatcherService emailDispatcherService;

    @Value("${app.notifications.manager-email:manager@farmoperations.com}")
    private String farmManagerEmail;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMM dd, yyyy");

    /**
     * Executes every Monday morning at 08:00:00 AM server time.
     */
    @Scheduled(cron = "0 0 8 * * MON")
    public void executeWeeklyExecutiveDigest() {
        log.info("Compiling scheduled weekly executive digest report...");

        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        long pastWeekMortalities = mortalityIncidentRepository.countByIncidentTimestampAfter(oneWeekAgo);
        long pastWeekAlerts = deliveryLogRepository.findByDispatchedAtAfter(oneWeekAgo).size();

        Map<String, Object> variables = new HashMap<>();
        variables.put("reportDate", LocalDateTime.now().format(DATE_FORMATTER));
        variables.put("startDate", oneWeekAgo.format(DATE_FORMATTER));
        variables.put("weeklyMortalities", pastWeekMortalities);
        variables.put("alertsDispatched", pastWeekAlerts);
        variables.put("systemHealth", "OPTIMAL");
        variables.put("dashboardUrl", "http://localhost:5173");

        String subject = "📊 Weekly Herd Executive Digest - Week of " + LocalDateTime.now().format(DATE_FORMATTER);
        emailDispatcherService.sendHtmlEmail(farmManagerEmail, subject, "weekly-digest", variables);
        log.info("Weekly executive digest successfully dispatched to {}", farmManagerEmail);
    }
}

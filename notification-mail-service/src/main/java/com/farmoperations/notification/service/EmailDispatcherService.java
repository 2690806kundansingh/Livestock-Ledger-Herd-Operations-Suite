// File: notification-mail-service/src/main/java/com/farmoperations/notification/service/EmailDispatcherService.java
package com.farmoperations.notification.service;

import com.farmoperations.notification.entity.DeliveryLog;
import com.farmoperations.notification.model.DeliveryStatus;
import com.farmoperations.notification.repository.DeliveryLogRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailDispatcherService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final DeliveryLogRepository deliveryLogRepository;

    @Value("${app.notifications.from-email:farm.operations.alert@gmail.com}")
    private String fromEmail;

    public void sendHtmlEmail(String recipient, String subject, String templateName, Map<String, Object> variables) {
        log.info("Preparing HTML email to {} using template {}", recipient, templateName);

        DeliveryLog deliveryLog = DeliveryLog.builder()
                .recipient(recipient)
                .subject(subject)
                .templateUsed(templateName)
                .dispatchedAt(LocalDateTime.now())
                .build();

        try {
            Context context = new Context();
            context.setVariables(variables);
            String htmlContent = templateEngine.process(templateName, context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);

            deliveryLog.setStatus(DeliveryStatus.SENT);
            log.info("Successfully dispatched email to {}", recipient);
        } catch (Exception ex) {
            log.error("Failed to send email to {}: {}", recipient, ex.getMessage(), ex);
            deliveryLog.setStatus(DeliveryStatus.FAILED);
            deliveryLog.setErrorMessage(ex.getMessage());
        } finally {
            try {
                deliveryLogRepository.save(deliveryLog);
            } catch (Exception dbEx) {
                log.error("Failed to persist delivery audit log: {}", dbEx.getMessage());
            }
        }
    }
}

// File: notification-mail-service/src/main/java/com/farmoperations/notification/entity/DeliveryLog.java
package com.farmoperations.notification.entity;

import com.farmoperations.notification.model.DeliveryStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_logs", indexes = {
        @Index(name = "idx_del_status", columnList = "status"),
        @Index(name = "idx_del_dispatched_at", columnList = "dispatchedAt")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String recipient;

    @Column(nullable = false, length = 200)
    private String subject;

    @Column(nullable = false, length = 100)
    private String templateUsed;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private DeliveryStatus status;

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    @Column(nullable = false)
    private LocalDateTime dispatchedAt;

    @PrePersist
    protected void onCreate() {
        if (this.dispatchedAt == null) {
            this.dispatchedAt = LocalDateTime.now();
        }
    }
}

// File: notification-mail-service/src/main/java/com/farmoperations/notification/entity/MortalityIncident.java
package com.farmoperations.notification.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mortality_incidents", indexes = {
        @Index(name = "idx_mort_timestamp", columnList = "incidentTimestamp")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MortalityIncident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 64)
    private String tagNumber;

    @Column(nullable = false, length = 64)
    private String penLocation;

    @Column(columnDefinition = "TEXT")
    private String causeOfDeath;

    @Column(nullable = false)
    private LocalDateTime incidentTimestamp;

    @PrePersist
    protected void onCreate() {
        if (this.incidentTimestamp == null) {
            this.incidentTimestamp = LocalDateTime.now();
        }
    }
}

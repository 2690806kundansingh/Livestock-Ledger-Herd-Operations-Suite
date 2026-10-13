// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/entity/LifeEvent.java
package com.farmoperations.livestock.entity;

import com.farmoperations.livestock.model.LifeEventType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "life_events", indexes = {
        @Index(name = "idx_life_event_animal_id", columnList = "animalId"),
        @Index(name = "idx_life_event_type", columnList = "eventType"),
        @Index(name = "idx_life_event_timestamp", columnList = "eventTimestamp")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LifeEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long animalId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private LifeEventType eventType;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(nullable = false, length = 100)
    private String recordedBy;

    @Column(nullable = false)
    private LocalDateTime eventTimestamp;

    @PrePersist
    protected void onCreate() {
        if (this.eventTimestamp == null) {
            this.eventTimestamp = LocalDateTime.now();
        }
    }
}

// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/entity/FeedStock.java
package com.farmoperations.inventory.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "feed_stocks", indexes = {
        @Index(name = "idx_feed_name", columnList = "feedName", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String feedName;

    @Column(nullable = false)
    private Double quantityKg;

    @Column(nullable = false, precision = 10, scale = 4)
    private BigDecimal costPerKg;

    @Column(nullable = false)
    private Double dailyConsumptionPerHeadKg;

    @Column(nullable = false)
    private Double reorderThresholdKg;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}

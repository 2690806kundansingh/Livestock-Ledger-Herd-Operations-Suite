// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/entity/ConsumptionLog.java
package com.farmoperations.inventory.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "consumption_logs", indexes = {
        @Index(name = "idx_cons_feed_stock_id", columnList = "feedStockId"),
        @Index(name = "idx_cons_logged_at", columnList = "loggedAt")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsumptionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long feedStockId;

    @Column(nullable = false, length = 64)
    private String penLocation;

    @Column(nullable = false)
    private Double quantityConsumedKg;

    @Column(nullable = false)
    private LocalDateTime loggedAt;

    @PrePersist
    protected void onCreate() {
        if (this.loggedAt == null) {
            this.loggedAt = LocalDateTime.now();
        }
    }
}

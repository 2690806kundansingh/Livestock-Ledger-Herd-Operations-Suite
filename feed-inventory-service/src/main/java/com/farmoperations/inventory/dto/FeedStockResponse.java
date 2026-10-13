// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/dto/FeedStockResponse.java
package com.farmoperations.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedStockResponse {
    private Long id;
    private String feedName;
    private Double quantityKg;
    private BigDecimal costPerKg;
    private Double dailyConsumptionPerHeadKg;
    private Double reorderThresholdKg;
    private boolean isLowStock;
    private Integer estimatedRunwayDays;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

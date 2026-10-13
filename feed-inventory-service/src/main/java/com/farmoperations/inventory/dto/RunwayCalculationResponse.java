// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/dto/RunwayCalculationResponse.java
package com.farmoperations.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RunwayCalculationResponse {
    private Long feedStockId;
    private String feedName;
    private Double currentQuantityKg;
    private Integer activeHeadcount;
    private Double dailyBurnRateKg;
    private Integer runwayDaysRemaining;
    private boolean isBelowSafetyThreshold;
    private LocalDateTime calculatedAt;
}

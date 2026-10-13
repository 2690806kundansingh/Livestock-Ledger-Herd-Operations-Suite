// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/dto/StockLowEvent.java
package com.farmoperations.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockLowEvent implements Serializable {
    private String eventId;
    private Long feedStockId;
    private String feedName;
    private Double currentQuantityKg;
    private Double reorderThresholdKg;
    private Integer runwayDaysRemaining;
    private LocalDateTime timestamp;
}

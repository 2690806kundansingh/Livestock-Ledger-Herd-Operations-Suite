// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/dto/ConsumptionRequest.java
package com.farmoperations.inventory.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsumptionRequest {

    @NotNull(message = "Feed stock ID is required")
    private Long feedStockId;

    @NotBlank(message = "Pen location is required")
    private String penLocation;

    @NotNull(message = "Consumed quantity is required")
    @DecimalMin(value = "0.1", message = "Quantity consumed must be greater than zero")
    private Double quantityConsumedKg;

    // Optional active headcount for runway recalculation
    private Integer currentActiveHeadcount;
}

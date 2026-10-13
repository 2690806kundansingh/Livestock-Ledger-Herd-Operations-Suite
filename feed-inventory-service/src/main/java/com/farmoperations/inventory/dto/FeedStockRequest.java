// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/dto/FeedStockRequest.java
package com.farmoperations.inventory.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedStockRequest {

    @NotBlank(message = "Feed name is required")
    private String feedName;

    @NotNull(message = "Initial quantity is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Quantity cannot be negative")
    private Double quantityKg;

    @NotNull(message = "Cost per kg is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Cost per kg must be greater than zero")
    private BigDecimal costPerKg;

    @NotNull(message = "Daily consumption per head is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Daily consumption must be greater than zero")
    private Double dailyConsumptionPerHeadKg;

    @NotNull(message = "Reorder threshold is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Reorder threshold cannot be negative")
    private Double reorderThresholdKg;
}

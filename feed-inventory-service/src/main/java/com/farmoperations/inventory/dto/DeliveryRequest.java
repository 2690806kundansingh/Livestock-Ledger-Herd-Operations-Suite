// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/dto/DeliveryRequest.java
package com.farmoperations.inventory.dto;

import jakarta.validation.constraints.DecimalMin;
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
public class DeliveryRequest {

    @NotNull(message = "Feed stock ID is required")
    private Long feedStockId;

    @NotNull(message = "Delivery quantity is required")
    @DecimalMin(value = "0.1", message = "Delivered quantity must be greater than zero")
    private Double quantityKg;

    private BigDecimal updatedCostPerKg; // Optional price adjustment
    private String supplierNotes;
}

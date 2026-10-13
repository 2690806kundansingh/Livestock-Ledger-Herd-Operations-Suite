// File: forecasting-pnl-service/src/main/java/com/farmoperations/forecast/dto/SimulationRequest.java
package com.farmoperations.forecast.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
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
public class SimulationRequest {

    private String simulationName;

    @NotNull(message = "Starting herd size is required")
    @Min(value = 1, message = "Herd size must be at least 1")
    private Integer startingHerdSize;

    @NotNull(message = "Projected mortality rate is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Mortality rate cannot be negative")
    @DecimalMax(value = "100.0", message = "Mortality rate cannot exceed 100%")
    private Double projectedMortalityRate; // e.g., 5.0 for 5%

    @NotNull(message = "Feed cost per head is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Feed cost cannot be negative")
    private BigDecimal feedCostPerHead; // e.g. 150.00

    @NotNull(message = "Feed inflation rate is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Inflation rate cannot be negative")
    private Double feedInflationRate; // e.g., 3.5 for 3.5%

    @NotNull(message = "Veterinary cost per head is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Vet cost cannot be negative")
    private BigDecimal vetCostPerHead; // e.g., 40.00

    @NotNull(message = "Target sale price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Target sale price must be positive")
    private BigDecimal targetSalePrice; // e.g., 350.00

    private BigDecimal operationalOverheadPerHead; // Optional overhead per head, default ~ 25.00
    private BigDecimal averageAcquisitionCost;     // Optional acquisition basis for mortality loss, default ~ 100.00
}

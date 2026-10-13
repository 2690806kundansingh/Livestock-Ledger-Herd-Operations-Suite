// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/dto/AnimalCreateRequest.java
package com.farmoperations.livestock.dto;

import com.farmoperations.livestock.model.AnimalStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimalCreateRequest {

    @NotBlank(message = "Tag number is required")
    private String tagNumber;

    @NotBlank(message = "Species is required")
    private String species;

    private AnimalStatus status;

    @NotBlank(message = "Pen location is required")
    private String penLocation;

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "0.1", message = "Weight must be greater than zero")
    private Double weightKg;

    @NotNull(message = "Birth date is required")
    private LocalDate birthDate;

    @NotNull(message = "Acquisition cost is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Acquisition cost cannot be negative")
    private BigDecimal acquisitionCost;
}

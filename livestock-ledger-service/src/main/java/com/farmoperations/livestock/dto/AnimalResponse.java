// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/dto/AnimalResponse.java
package com.farmoperations.livestock.dto;

import com.farmoperations.livestock.model.AnimalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimalResponse {
    private Long id;
    private String tagNumber;
    private String species;
    private AnimalStatus status;
    private String penLocation;
    private Double weightKg;
    private LocalDate birthDate;
    private BigDecimal acquisitionCost;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

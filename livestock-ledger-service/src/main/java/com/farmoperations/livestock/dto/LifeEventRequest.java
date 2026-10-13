// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/dto/LifeEventRequest.java
package com.farmoperations.livestock.dto;

import com.farmoperations.livestock.model.LifeEventType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LifeEventRequest {

    @NotNull(message = "Animal ID is required")
    private Long animalId;

    @NotNull(message = "Life event type is required")
    private LifeEventType eventType;

    private String details;

    @NotBlank(message = "Recorded by is required")
    private String recordedBy;

    // Optional override; defaults to current timestamp
    private LocalDateTime eventTimestamp;

    // Specific contextual fields
    private String newPenLocation;  // Used for TRANSFER
    private String causeOfDeath;    // Used for MORTALITY
    private String treatmentNotes;  // Used for TREATMENT
    private Double salePrice;       // Used for SALE
}

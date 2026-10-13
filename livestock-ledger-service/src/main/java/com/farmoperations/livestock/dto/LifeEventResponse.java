// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/dto/LifeEventResponse.java
package com.farmoperations.livestock.dto;

import com.farmoperations.livestock.model.LifeEventType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LifeEventResponse {
    private Long id;
    private Long animalId;
    private LifeEventType eventType;
    private String details;
    private String recordedBy;
    private LocalDateTime eventTimestamp;
}

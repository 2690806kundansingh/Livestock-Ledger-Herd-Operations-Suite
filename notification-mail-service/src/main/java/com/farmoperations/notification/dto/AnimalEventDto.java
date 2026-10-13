// File: notification-mail-service/src/main/java/com/farmoperations/notification/dto/AnimalEventDto.java
package com.farmoperations.notification.dto;

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
public class AnimalEventDto implements Serializable {
    private String eventId;
    private String eventType;
    private Long animalId;
    private String tagNumber;
    private String penLocation;
    private String reason;
    private LocalDateTime timestamp;
}

// File: notification-mail-service/src/main/java/com/farmoperations/notification/dto/StockLowEventDto.java
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
public class StockLowEventDto implements Serializable {
    private String eventId;
    private Long feedStockId;
    private String feedName;
    private Double currentQuantityKg;
    private Double reorderThresholdKg;
    private Integer runwayDaysRemaining;
    private LocalDateTime timestamp;
}

// File: notification-mail-service/src/main/java/com/farmoperations/notification/dto/TestAlertRequest.java
package com.farmoperations.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestAlertRequest {
    private String recipient;
    private String alertType; // MORTALITY, INVENTORY, DIGEST
    private String tagNumber;
    private String penLocation;
    private String details;
}

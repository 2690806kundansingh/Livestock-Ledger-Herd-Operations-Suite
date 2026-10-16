// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/dto/NearbyFarmResponseDto.java
package com.farmoperations.livestock.dto;

import lombok.*;

import java.util.List;
import java.util.UUID;

/**
 * DTO returned by the nearby farms discovery API, including geospatial distance
 * and one-tap communication links.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NearbyFarmResponseDto {

    private UUID id;
    private String farmName;
    private String farmerName;
    private String phoneNumber;
    private List<String> produceList;

    private Double latitude;
    private Double longitude;

    /**
     * Calculated distance in kilometers from origin query coordinates,
     * computed via PostGIS ST_Distance on WGS 84 geography.
     */
    private Double distanceKm;

    /**
     * Direct telephone dial URI (e.g., "tel:+919825144021").
     */
    private String directDialUrl;

    /**
     * WhatsApp click-to-chat API URI with prefilled greeting.
     * (e.g., "https://wa.me/919825144021?text=Hello%20Rameshwar%2C%20...")
     */
    private String whatsappUrl;
}

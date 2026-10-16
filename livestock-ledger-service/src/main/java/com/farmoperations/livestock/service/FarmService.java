// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/service/FarmService.java
package com.farmoperations.livestock.service;

import com.farmoperations.livestock.dto.FarmLocationDto;
import com.farmoperations.livestock.dto.NearbyFarmResponseDto;

import java.util.List;

public interface FarmService {

    /**
     * Registers a new farm or updates its spatial coordinates in PostGIS (SRID 4326).
     */
    NearbyFarmResponseDto registerFarm(FarmLocationDto dto);

    /**
     * Discovers farms within radiusKm sorted ascending by geodesic distance.
     */
    List<NearbyFarmResponseDto> getNearbyFarms(double latitude, double longitude, double radiusKm, String produce);
}

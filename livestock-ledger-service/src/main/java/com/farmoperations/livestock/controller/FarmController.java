// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/controller/FarmController.java
package com.farmoperations.livestock.controller;

import com.farmoperations.livestock.dto.FarmLocationDto;
import com.farmoperations.livestock.dto.NearbyFarmResponseDto;
import com.farmoperations.livestock.service.FarmService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/farms")
@RequiredArgsConstructor
@Validated
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FarmController {

    private final FarmService farmService;

    /**
     * GET /api/v1/farms/nearby
     * Discovers farms within radiusKm sorted in ascending order of proximity.
     *
     * @param latitude  Origin latitude coordinate (-90.0 to 90.0)
     * @param longitude Origin longitude coordinate (-180.0 to 180.0)
     * @param radiusKm  Search radius in kilometers (0.5 to 500.0, default 15.0)
     * @param produce   Optional filter string (e.g., "Cow Milk", "Goat", "Fish")
     */
    @GetMapping("/nearby")
    public ResponseEntity<List<NearbyFarmResponseDto>> getNearbyFarms(
        @RequestParam
        @DecimalMin(value = "-90.0", message = "Latitude must be >= -90.0")
        @DecimalMax(value = "90.0", message = "Latitude must be <= 90.0")
        double latitude,

        @RequestParam
        @DecimalMin(value = "-180.0", message = "Longitude must be >= -180.0")
        @DecimalMax(value = "180.0", message = "Longitude must be <= 180.0")
        double longitude,

        @RequestParam(defaultValue = "15.0")
        @DecimalMin(value = "0.5", message = "Radius must be at least 0.5 km")
        @DecimalMax(value = "500.0", message = "Radius cannot exceed 500.0 km")
        double radiusKm,

        @RequestParam(required = false)
        String produce
    ) {
        log.info("Received request for nearby farms: lat={}, lon={}, radiusKm={}, produce='{}'",
            latitude, longitude, radiusKm, produce);

        List<NearbyFarmResponseDto> results = farmService.getNearbyFarms(latitude, longitude, radiusKm, produce);
        return ResponseEntity.ok(results);
    }

    /**
     * POST /api/v1/farms
     * Registers a new farm with spatial coordinates.
     */
    @PostMapping
    public ResponseEntity<NearbyFarmResponseDto> registerFarm(
        @Valid @RequestBody FarmLocationDto dto
    ) {
        log.info("Received request to register farm: '{}'", dto.getFarmName());
        NearbyFarmResponseDto response = farmService.registerFarm(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

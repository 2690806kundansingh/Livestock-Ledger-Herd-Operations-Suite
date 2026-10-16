// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/dto/FarmLocationDto.java
package com.farmoperations.livestock.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

/**
 * Data Transfer Object for creating or registering a farm with geographic coordinates.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmLocationDto {

    @NotBlank(message = "Farm name cannot be blank")
    @Size(max = 150, message = "Farm name cannot exceed 150 characters")
    private String farmName;

    @NotBlank(message = "Farmer name cannot be blank")
    @Size(max = 100, message = "Farmer name cannot exceed 100 characters")
    private String farmerName;

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^(\\+?[0-9]{10,15})$",
        message = "Phone number must be a valid national or international format (10-15 digits)"
    )
    private String phoneNumber;

    @NotEmpty(message = "At least one produce item or livestock specialty is required")
    private List<String> produceList;

    @NotNull(message = "Latitude coordinate is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be >= -90.0")
    @DecimalMax(value = "90.0", message = "Latitude must be <= 90.0")
    private Double latitude;

    @NotNull(message = "Longitude coordinate is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be >= -180.0")
    @DecimalMax(value = "180.0", message = "Longitude must be <= 180.0")
    private Double longitude;
}

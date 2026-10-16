// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/repository/NearbyFarmProjection.java
package com.farmoperations.livestock.repository;

import java.util.UUID;

/**
 * Spring Data JPA Projection interface for receiving native PostGIS query results
 * including spatial coordinates and computed geodesic distance in kilometers.
 */
public interface NearbyFarmProjection {

    UUID getId();

    String getFarmName();

    String getFarmerName();

    String getPhoneNumber();

    Double getLatitude();

    Double getLongitude();

    Double getDistanceKm();
}

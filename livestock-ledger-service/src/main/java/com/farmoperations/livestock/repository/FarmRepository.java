// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/repository/FarmRepository.java
package com.farmoperations.livestock.repository;

import com.farmoperations.livestock.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Spring Data JPA Repository providing PostGIS spatial queries.
 * Utilizes GiST spatial indexing with ST_DWithin and ST_Distance on geography.
 */
@Repository
public interface FarmRepository extends JpaRepository<Farm, UUID> {

    /**
     * Finds all farms within a given radius (in meters) of an origin (lat, lon) coordinate,
     * calculating geodesic distance in kilometers and sorting in ascending proximity order.
     */
    @Query(value = """
        SELECT DISTINCT f.id AS id,
               f.farm_name AS farmName,
               f.farmer_name AS farmerName,
               f.phone_number AS phoneNumber,
               ST_Y(f.location) AS latitude,
               ST_X(f.location) AS longitude,
               ROUND(CAST(ST_Distance(f.location::geography, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography) / 1000.0 AS numeric), 2) AS distanceKm
        FROM farms f
        LEFT JOIN farm_produce fp ON f.id = fp.farm_id
        WHERE ST_DWithin(f.location::geography, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography, :radiusMeters)
          AND (CAST(:produce AS text) IS NULL OR CAST(:produce AS text) = '' OR LOWER(fp.produce_item) LIKE LOWER(CONCAT('%', CAST(:produce AS text), '%')))
        ORDER BY distanceKm ASC
        """, nativeQuery = true)
    List<NearbyFarmProjection> findNearbyFarmsWithFilter(
        @Param("lat") double latitude,
        @Param("lon") double longitude,
        @Param("radiusMeters") double radiusMeters,
        @Param("produce") String produce
    );
}

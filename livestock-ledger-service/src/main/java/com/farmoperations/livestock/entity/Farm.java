// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/entity/Farm.java
package com.farmoperations.livestock.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.locationtech.jts.geom.Point;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * JPA Entity representing a registered farm with geospatial coordinates (SRID 4326).
 * Backed by PostgreSQL with PostGIS extension.
 */
@Entity
@Table(
    name = "farms",
    indexes = {
        @Index(name = "idx_farms_location_gist", columnList = "location")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "farm_name", nullable = false, length = 150)
    private String farmName;

    @Column(name = "farmer_name", nullable = false, length = 100)
    private String farmerName;

    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "farm_produce", joinColumns = @JoinColumn(name = "farm_id"))
    @Column(name = "produce_item")
    @Builder.Default
    private List<String> produceList = new ArrayList<>();

    /**
     * PostGIS Point Geometry in WGS 84 (SRID 4326).
     * Coordinate order in JTS Point: X = Longitude, Y = Latitude.
     */
    @Column(name = "location", columnDefinition = "geometry(Point, 4326)", nullable = false)
    private Point location;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;
}

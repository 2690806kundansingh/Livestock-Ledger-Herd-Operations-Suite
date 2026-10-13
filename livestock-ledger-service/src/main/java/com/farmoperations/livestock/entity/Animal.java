// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/entity/Animal.java
package com.farmoperations.livestock.entity;

import com.farmoperations.livestock.model.AnimalStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "animals", indexes = {
        @Index(name = "idx_animal_tag_number", columnList = "tagNumber", unique = true),
        @Index(name = "idx_animal_status", columnList = "status"),
        @Index(name = "idx_animal_species", columnList = "species")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 64)
    private String tagNumber;

    @Column(nullable = false, length = 64)
    private String species;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private AnimalStatus status;

    @Column(nullable = false, length = 64)
    private String penLocation;

    @Column(nullable = false)
    private Double weightKg;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal acquisitionCost;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = AnimalStatus.ACTIVE;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}

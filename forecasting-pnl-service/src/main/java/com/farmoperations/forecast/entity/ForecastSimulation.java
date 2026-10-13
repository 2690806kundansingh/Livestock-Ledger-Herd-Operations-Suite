// File: forecasting-pnl-service/src/main/java/com/farmoperations/forecast/entity/ForecastSimulation.java
package com.farmoperations.forecast.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "forecast_simulations", indexes = {
        @Index(name = "idx_sim_created_at", columnList = "createdAt")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ForecastSimulation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String simulationName;

    @Column(nullable = false)
    private Integer startingHerdSize;

    @Column(nullable = false)
    private Double projectedMortalityRate;

    @Column(nullable = false)
    private Double feedInflationRate;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal vetCostPerHead;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal targetSalePrice;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal netProfit;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal grossRevenue;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalExpenses;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}

// File: forecasting-pnl-service/src/main/java/com/farmoperations/forecast/repository/ForecastSimulationRepository.java
package com.farmoperations.forecast.repository;

import com.farmoperations.forecast.entity.ForecastSimulation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForecastSimulationRepository extends JpaRepository<ForecastSimulation, Long> {
    List<ForecastSimulation> findTop20ByOrderByCreatedAtDesc();
}

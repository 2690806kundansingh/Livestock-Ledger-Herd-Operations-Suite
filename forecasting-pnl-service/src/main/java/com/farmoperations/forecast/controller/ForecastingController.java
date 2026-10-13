// File: forecasting-pnl-service/src/main/java/com/farmoperations/forecast/controller/ForecastingController.java
package com.farmoperations.forecast.controller;

import com.farmoperations.forecast.dto.SimulationRequest;
import com.farmoperations.forecast.dto.WaterfallForecastResponse;
import com.farmoperations.forecast.entity.ForecastSimulation;
import com.farmoperations.forecast.service.ForecastingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/forecast")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ForecastingController {

    private final ForecastingService forecastingService;

    @PostMapping("/simulate")
    public ResponseEntity<WaterfallForecastResponse> simulateForecast(
            @Valid @RequestBody SimulationRequest request) {
        WaterfallForecastResponse response = forecastingService.simulateWaterfall(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<ForecastSimulation>> getSimulationHistory() {
        return ResponseEntity.ok(forecastingService.getSimulationHistory());
    }
}

// File: forecasting-pnl-service/src/main/java/com/farmoperations/forecast/service/ForecastingService.java
package com.farmoperations.forecast.service;

import com.farmoperations.forecast.dto.SimulationRequest;
import com.farmoperations.forecast.dto.WaterfallForecastResponse;
import com.farmoperations.forecast.dto.WaterfallStepDto;
import com.farmoperations.forecast.entity.ForecastSimulation;
import com.farmoperations.forecast.repository.ForecastSimulationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ForecastingService {

    private final ForecastSimulationRepository forecastSimulationRepository;

    private static final BigDecimal DEFAULT_OVERHEAD_PER_HEAD = new BigDecimal("25.00");
    private static final BigDecimal DEFAULT_ACQUISITION_BASIS = new BigDecimal("120.00");

    @Transactional
    public WaterfallForecastResponse simulateWaterfall(SimulationRequest request) {
        log.info("Simulating P&L forecast for starting herd size: {}, target sale price: {}",
                request.getStartingHerdSize(), request.getTargetSalePrice());

        int startingHerd = request.getStartingHerdSize();
        double mortalityRate = request.getProjectedMortalityRate();
        int mortalityCount = (int) Math.round(startingHerd * (mortalityRate / 100.0));
        int survivingCount = Math.max(0, startingHerd - mortalityCount);

        // 1. Gross Revenue = Surviving Headcount * Target Sale Price
        BigDecimal grossRevenue = request.getTargetSalePrice()
                .multiply(BigDecimal.valueOf(survivingCount))
                .setScale(2, RoundingMode.HALF_UP);

        // 2. Annual Feed Expense adjusted for inflation: startingHerd * (feedCostPerHead * (1 + inflation / 100))
        BigDecimal inflationMultiplier = BigDecimal.ONE.add(
                BigDecimal.valueOf(request.getFeedInflationRate()).divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP)
        );
        BigDecimal adjustedFeedPerHead = request.getFeedCostPerHead().multiply(inflationMultiplier);
        BigDecimal annualFeedExpense = adjustedFeedPerHead
                .multiply(BigDecimal.valueOf(startingHerd))
                .setScale(2, RoundingMode.HALF_UP);

        // 3. Veterinary Care = startingHerd * vetCostPerHead
        BigDecimal veterinaryCare = request.getVetCostPerHead()
                .multiply(BigDecimal.valueOf(startingHerd))
                .setScale(2, RoundingMode.HALF_UP);

        // 4. Mortality Depreciation = mortalityCount * acquisitionCostBasis
        BigDecimal acquisitionCostBasis = (request.getAverageAcquisitionCost() != null)
                ? request.getAverageAcquisitionCost()
                : DEFAULT_ACQUISITION_BASIS;
        BigDecimal mortalityDepreciation = acquisitionCostBasis
                .multiply(BigDecimal.valueOf(mortalityCount))
                .setScale(2, RoundingMode.HALF_UP);

        // 5. Operational Overhead = startingHerd * overheadPerHead
        BigDecimal overheadPerHead = (request.getOperationalOverheadPerHead() != null)
                ? request.getOperationalOverheadPerHead()
                : DEFAULT_OVERHEAD_PER_HEAD;
        BigDecimal operationalOverhead = overheadPerHead
                .multiply(BigDecimal.valueOf(startingHerd))
                .setScale(2, RoundingMode.HALF_UP);

        // Total Operating Expenses
        BigDecimal totalExpenses = annualFeedExpense
                .add(veterinaryCare)
                .add(mortalityDepreciation)
                .add(operationalOverhead)
                .setScale(2, RoundingMode.HALF_UP);

        // Net Profit = Gross Revenue - Total Expenses
        BigDecimal netProfit = grossRevenue.subtract(totalExpenses).setScale(2, RoundingMode.HALF_UP);

        // Profit Margin %
        double profitMarginPercentage = 0.0;
        if (grossRevenue.compareTo(BigDecimal.ZERO) > 0) {
            profitMarginPercentage = netProfit.divide(grossRevenue, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .doubleValue();
            profitMarginPercentage = Math.round(profitMarginPercentage * 100.0) / 100.0;
        }

        // Build Waterfall Step Items
        List<WaterfallStepDto> waterfallSteps = new ArrayList<>();
        BigDecimal running = BigDecimal.ZERO;

        // Step 1: Gross Revenue
        running = running.add(grossRevenue);
        waterfallSteps.add(WaterfallStepDto.builder()
                .name("Gross Revenue")
                .amount(grossRevenue)
                .stepType("REVENUE")
                .runningTotal(running)
                .build());

        // Step 2: Feed Expenses
        running = running.subtract(annualFeedExpense);
        waterfallSteps.add(WaterfallStepDto.builder()
                .name("Annual Feed Expense")
                .amount(annualFeedExpense.negate())
                .stepType("EXPENSE")
                .runningTotal(running)
                .build());

        // Step 3: Veterinary Care
        running = running.subtract(veterinaryCare);
        waterfallSteps.add(WaterfallStepDto.builder()
                .name("Veterinary Care")
                .amount(veterinaryCare.negate())
                .stepType("EXPENSE")
                .runningTotal(running)
                .build());

        // Step 4: Mortality Depreciation
        running = running.subtract(mortalityDepreciation);
        waterfallSteps.add(WaterfallStepDto.builder()
                .name("Mortality Depreciation")
                .amount(mortalityDepreciation.negate())
                .stepType("EXPENSE")
                .runningTotal(running)
                .build());

        // Step 5: Operational Overhead
        running = running.subtract(operationalOverhead);
        waterfallSteps.add(WaterfallStepDto.builder()
                .name("Operational Overhead")
                .amount(operationalOverhead.negate())
                .stepType("EXPENSE")
                .runningTotal(running)
                .build());

        // Step 6: Net Profit
        waterfallSteps.add(WaterfallStepDto.builder()
                .name("Net Profit")
                .amount(netProfit)
                .stepType("SUMMARY")
                .runningTotal(netProfit)
                .build());

        // Save Simulation Run
        String simName = (request.getSimulationName() != null && !request.getSimulationName().isBlank())
                ? request.getSimulationName()
                : "Simulation-" + System.currentTimeMillis();

        ForecastSimulation entity = ForecastSimulation.builder()
                .simulationName(simName)
                .startingHerdSize(startingHerd)
                .projectedMortalityRate(mortalityRate)
                .feedInflationRate(request.getFeedInflationRate())
                .vetCostPerHead(request.getVetCostPerHead())
                .targetSalePrice(request.getTargetSalePrice())
                .grossRevenue(grossRevenue)
                .totalExpenses(totalExpenses)
                .netProfit(netProfit)
                .createdAt(LocalDateTime.now())
                .build();
        ForecastSimulation saved = forecastSimulationRepository.save(entity);

        return WaterfallForecastResponse.builder()
                .simulationId(saved.getId())
                .simulationName(simName)
                .startingHerdSize(startingHerd)
                .survivingHeadcount(survivingCount)
                .mortalityCount(mortalityCount)
                .grossRevenue(grossRevenue)
                .annualFeedExpense(annualFeedExpense)
                .veterinaryCare(veterinaryCare)
                .mortalityDepreciation(mortalityDepreciation)
                .operationalOverhead(operationalOverhead)
                .totalExpenses(totalExpenses)
                .netProfit(netProfit)
                .profitMarginPercentage(profitMarginPercentage)
                .isProfitable(netProfit.compareTo(BigDecimal.ZERO) >= 0)
                .waterfallSteps(waterfallSteps)
                .generatedAt(LocalDateTime.now())
                .build();
    }

    @Transactional(readOnly = true)
    public List<ForecastSimulation> getSimulationHistory() {
        return forecastSimulationRepository.findTop20ByOrderByCreatedAtDesc();
    }
}

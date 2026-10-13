// File: forecasting-pnl-service/src/main/java/com/farmoperations/forecast/dto/WaterfallForecastResponse.java
package com.farmoperations.forecast.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WaterfallForecastResponse {
    private Long simulationId;
    private String simulationName;
    private Integer startingHerdSize;
    private Integer survivingHeadcount;
    private Integer mortalityCount;
    private BigDecimal grossRevenue;
    private BigDecimal annualFeedExpense;
    private BigDecimal veterinaryCare;
    private BigDecimal mortalityDepreciation;
    private BigDecimal operationalOverhead;
    private BigDecimal totalExpenses;
    private BigDecimal netProfit;
    private Double profitMarginPercentage;
    private boolean isProfitable;
    private List<WaterfallStepDto> waterfallSteps;
    private LocalDateTime generatedAt;
}

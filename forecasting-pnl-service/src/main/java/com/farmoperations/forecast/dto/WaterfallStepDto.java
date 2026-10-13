// File: forecasting-pnl-service/src/main/java/com/farmoperations/forecast/dto/WaterfallStepDto.java
package com.farmoperations.forecast.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WaterfallStepDto {
    private String name;
    private BigDecimal amount;
    private String stepType; // REVENUE, EXPENSE, SUMMARY
    private BigDecimal runningTotal;
}

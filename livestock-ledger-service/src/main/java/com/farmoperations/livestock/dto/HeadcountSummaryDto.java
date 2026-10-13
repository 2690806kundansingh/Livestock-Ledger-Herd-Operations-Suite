// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/dto/HeadcountSummaryDto.java
package com.farmoperations.livestock.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HeadcountSummaryDto implements Serializable {
    private long totalHeadcount;
    private long activeCount;
    private long quarantineCount;
    private long soldCount;
    private long deceasedCount;
    private long juvenileCount;
    private double mortalityRatePercentage;
    private LocalDateTime calculatedAt;
}

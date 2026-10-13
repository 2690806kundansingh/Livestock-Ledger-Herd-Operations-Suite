// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/config/DataInitializer.java
package com.farmoperations.inventory.config;

import com.farmoperations.inventory.entity.FeedStock;
import com.farmoperations.inventory.repository.FeedStockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final FeedStockRepository feedStockRepository;

    @Override
    public void run(String... args) {
        if (feedStockRepository.count() > 0) {
            log.info("Feed inventory database already seeded. Skipping initial inventory.");
            return;
        }

        log.info("Seeding initial feed stocks into inventory_db...");

        List<FeedStock> stocks = List.of(
                FeedStock.builder()
                        .feedName("Alfalfa Premium Hay")
                        .quantityKg(12500.0)
                        .costPerKg(new BigDecimal("0.4500"))
                        .dailyConsumptionPerHeadKg(8.5)
                        .reorderThresholdKg(3000.0)
                        .build(),
                FeedStock.builder()
                        .feedName("Corn Silage High Energy")
                        .quantityKg(18000.0)
                        .costPerKg(new BigDecimal("0.2800"))
                        .dailyConsumptionPerHeadKg(12.0)
                        .reorderThresholdKg(4500.0)
                        .build(),
                FeedStock.builder()
                        .feedName("Soybean Meal Protein Concentrate")
                        .quantityKg(2100.0)
                        .costPerKg(new BigDecimal("0.8500"))
                        .dailyConsumptionPerHeadKg(1.5)
                        .reorderThresholdKg(2500.0) // Currently below threshold to demonstrate alert
                        .build(),
                FeedStock.builder()
                        .feedName("Mineral & Vitamin Salt Block")
                        .quantityKg(850.0)
                        .costPerKg(new BigDecimal("1.2000"))
                        .dailyConsumptionPerHeadKg(0.2)
                        .reorderThresholdKg(200.0)
                        .build()
        );

        feedStockRepository.saveAll(stocks);
        log.info("Seeded {} feed stock types.", stocks.size());
    }
}

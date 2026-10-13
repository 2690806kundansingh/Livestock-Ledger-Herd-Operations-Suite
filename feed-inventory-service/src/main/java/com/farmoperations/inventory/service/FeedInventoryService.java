// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/service/FeedInventoryService.java
package com.farmoperations.inventory.service;

import com.farmoperations.inventory.dto.*;
import com.farmoperations.inventory.entity.ConsumptionLog;
import com.farmoperations.inventory.entity.FeedStock;
import com.farmoperations.inventory.repository.ConsumptionLogRepository;
import com.farmoperations.inventory.repository.FeedStockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeedInventoryService {

    private final FeedStockRepository feedStockRepository;
    private final ConsumptionLogRepository consumptionLogRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${app.kafka.topics.inventory-events:inventory.events}")
    private String inventoryEventsTopic;

    // Default assumed herd size if not specified in request
    private static final int DEFAULT_HEADCOUNT = 150;

    @Transactional(readOnly = true)
    public List<FeedStockResponse> getAllFeedStocks() {
        return feedStockRepository.findAll().stream()
                .map(stock -> mapToResponse(stock, DEFAULT_HEADCOUNT))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FeedStockResponse getFeedStockById(Long id) {
        FeedStock stock = feedStockRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Feed stock not found with ID: " + id));
        return mapToResponse(stock, DEFAULT_HEADCOUNT);
    }

    @Transactional
    public FeedStockResponse createFeedStock(FeedStockRequest request) {
        log.info("Registering new feed stock: {}", request.getFeedName());

        if (feedStockRepository.findByFeedName(request.getFeedName()).isPresent()) {
            throw new IllegalArgumentException("Feed stock with name '" + request.getFeedName() + "' already exists");
        }

        FeedStock stock = FeedStock.builder()
                .feedName(request.getFeedName())
                .quantityKg(request.getQuantityKg())
                .costPerKg(request.getCostPerKg())
                .dailyConsumptionPerHeadKg(request.getDailyConsumptionPerHeadKg())
                .reorderThresholdKg(request.getReorderThresholdKg())
                .build();

        FeedStock saved = feedStockRepository.save(stock);
        return mapToResponse(saved, DEFAULT_HEADCOUNT);
    }

    @Transactional
    public FeedStockResponse recordDelivery(DeliveryRequest request) {
        log.info("Recording delivery of {} kg for feed stock ID: {}", request.getQuantityKg(), request.getFeedStockId());

        FeedStock stock = feedStockRepository.findById(request.getFeedStockId())
                .orElseThrow(() -> new IllegalArgumentException("Feed stock not found with ID: " + request.getFeedStockId()));

        stock.setQuantityKg(stock.getQuantityKg() + request.getQuantityKg());
        if (request.getUpdatedCostPerKg() != null) {
            stock.setCostPerKg(request.getUpdatedCostPerKg());
        }

        FeedStock updated = feedStockRepository.save(stock);
        return mapToResponse(updated, DEFAULT_HEADCOUNT);
    }

    @Transactional
    public FeedStockResponse recordConsumption(ConsumptionRequest request) {
        log.info("Logging consumption: {} kg of stock ID {} in pen {}",
                request.getQuantityConsumedKg(), request.getFeedStockId(), request.getPenLocation());

        FeedStock stock = feedStockRepository.findById(request.getFeedStockId())
                .orElseThrow(() -> new IllegalArgumentException("Feed stock not found with ID: " + request.getFeedStockId()));

        double newQuantity = Math.max(0.0, stock.getQuantityKg() - request.getQuantityConsumedKg());
        stock.setQuantityKg(newQuantity);

        FeedStock updated = feedStockRepository.save(stock);

        // Record consumption log entry
        ConsumptionLog logEntry = ConsumptionLog.builder()
                .feedStockId(stock.getId())
                .penLocation(request.getPenLocation())
                .quantityConsumedKg(request.getQuantityConsumedKg())
                .loggedAt(LocalDateTime.now())
                .build();
        consumptionLogRepository.save(logEntry);

        // Evaluate runway and threshold
        int activeHeadcount = (request.getCurrentActiveHeadcount() != null && request.getCurrentActiveHeadcount() > 0)
                ? request.getCurrentActiveHeadcount()
                : DEFAULT_HEADCOUNT;

        int runwayDays = calculateRunwayDays(updated.getQuantityKg(), updated.getDailyConsumptionPerHeadKg(), activeHeadcount);

        if (updated.getQuantityKg() <= updated.getReorderThresholdKg()) {
            emitStockLowEvent(updated, runwayDays);
        }

        return mapToResponse(updated, activeHeadcount);
    }

    @Transactional(readOnly = true)
    public RunwayCalculationResponse calculateRunway(Long feedStockId, Integer activeHeadcount) {
        FeedStock stock = feedStockRepository.findById(feedStockId)
                .orElseThrow(() -> new IllegalArgumentException("Feed stock not found with ID: " + feedStockId));

        int headcount = (activeHeadcount != null && activeHeadcount > 0) ? activeHeadcount : DEFAULT_HEADCOUNT;
        double dailyBurnRate = stock.getDailyConsumptionPerHeadKg() * headcount;
        int runwayDays = calculateRunwayDays(stock.getQuantityKg(), stock.getDailyConsumptionPerHeadKg(), headcount);

        return RunwayCalculationResponse.builder()
                .feedStockId(stock.getId())
                .feedName(stock.getFeedName())
                .currentQuantityKg(stock.getQuantityKg())
                .activeHeadcount(headcount)
                .dailyBurnRateKg(dailyBurnRate)
                .runwayDaysRemaining(runwayDays)
                .isBelowSafetyThreshold(stock.getQuantityKg() <= stock.getReorderThresholdKg())
                .calculatedAt(LocalDateTime.now())
                .build();
    }

    private void emitStockLowEvent(FeedStock stock, int runwayDays) {
        log.warn("Stock level under safety threshold! Emitting StockLowEvent for feed '{}' (Current: {} kg, Threshold: {} kg)",
                stock.getFeedName(), stock.getQuantityKg(), stock.getReorderThresholdKg());

        StockLowEvent event = StockLowEvent.builder()
                .eventId(UUID.randomUUID().toString())
                .feedStockId(stock.getId())
                .feedName(stock.getFeedName())
                .currentQuantityKg(stock.getQuantityKg())
                .reorderThresholdKg(stock.getReorderThresholdKg())
                .runwayDaysRemaining(runwayDays)
                .timestamp(LocalDateTime.now())
                .build();

        kafkaTemplate.send(inventoryEventsTopic, stock.getFeedName(), event);
        log.info("Dispatched StockLowEvent to Kafka topic {}: {}", inventoryEventsTopic, event);
    }

    private int calculateRunwayDays(double quantityKg, double dailyConsumptionPerHeadKg, int headcount) {
        double dailyConsumptionTotal = dailyConsumptionPerHeadKg * headcount;
        if (dailyConsumptionTotal <= 0.0) {
            return 999;
        }
        return (int) Math.floor(quantityKg / dailyConsumptionTotal);
    }

    private FeedStockResponse mapToResponse(FeedStock stock, int headcount) {
        int runwayDays = calculateRunwayDays(stock.getQuantityKg(), stock.getDailyConsumptionPerHeadKg(), headcount);
        return FeedStockResponse.builder()
                .id(stock.getId())
                .feedName(stock.getFeedName())
                .quantityKg(stock.getQuantityKg())
                .costPerKg(stock.getCostPerKg())
                .dailyConsumptionPerHeadKg(stock.getDailyConsumptionPerHeadKg())
                .reorderThresholdKg(stock.getReorderThresholdKg())
                .isLowStock(stock.getQuantityKg() <= stock.getReorderThresholdKg())
                .estimatedRunwayDays(runwayDays)
                .createdAt(stock.getCreatedAt())
                .updatedAt(stock.getUpdatedAt())
                .build();
    }
}

// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/controller/FeedInventoryController.java
package com.farmoperations.inventory.controller;

import com.farmoperations.inventory.dto.*;
import com.farmoperations.inventory.service.FeedInventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/inventory")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FeedInventoryController {

    private final FeedInventoryService feedInventoryService;

    @GetMapping("/stocks")
    public ResponseEntity<List<FeedStockResponse>> getAllFeedStocks() {
        return ResponseEntity.ok(feedInventoryService.getAllFeedStocks());
    }

    @GetMapping("/stocks/{id}")
    public ResponseEntity<FeedStockResponse> getFeedStockById(@PathVariable Long id) {
        return ResponseEntity.ok(feedInventoryService.getFeedStockById(id));
    }

    @PostMapping("/stocks")
    public ResponseEntity<FeedStockResponse> createFeedStock(
            @Valid @RequestBody FeedStockRequest request) {
        FeedStockResponse response = feedInventoryService.createFeedStock(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/deliveries")
    public ResponseEntity<FeedStockResponse> recordDelivery(
            @Valid @RequestBody DeliveryRequest request) {
        FeedStockResponse response = feedInventoryService.recordDelivery(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/consumption")
    public ResponseEntity<FeedStockResponse> recordConsumption(
            @Valid @RequestBody ConsumptionRequest request) {
        FeedStockResponse response = feedInventoryService.recordConsumption(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/runway/{id}")
    public ResponseEntity<RunwayCalculationResponse> calculateRunway(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "150") Integer headcount) {
        return ResponseEntity.ok(feedInventoryService.calculateRunway(id, headcount));
    }
}

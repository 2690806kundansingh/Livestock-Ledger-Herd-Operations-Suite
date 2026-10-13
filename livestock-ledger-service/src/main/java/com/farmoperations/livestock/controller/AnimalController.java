// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/controller/AnimalController.java
package com.farmoperations.livestock.controller;

import com.farmoperations.livestock.dto.*;
import com.farmoperations.livestock.model.AnimalStatus;
import com.farmoperations.livestock.service.AnimalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/animals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnimalController {

    private final AnimalService animalService;

    @GetMapping
    public ResponseEntity<List<AnimalResponse>> getAllAnimals(
            @RequestParam(required = false) AnimalStatus status) {
        return ResponseEntity.ok(animalService.getAllAnimals(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalResponse> getAnimalById(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.getAnimalById(id));
    }

    @PostMapping
    public ResponseEntity<AnimalResponse> registerAnimal(
            @Valid @RequestBody AnimalCreateRequest request) {
        AnimalResponse response = animalService.registerBirthOrAcquisition(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/events")
    public ResponseEntity<LifeEventResponse> recordLifeEvent(
            @Valid @RequestBody LifeEventRequest request) {
        LifeEventResponse response = animalService.processLifeEvent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/census")
    public ResponseEntity<HeadcountSummaryDto> getCensusSummary() {
        return ResponseEntity.ok(animalService.getHeadcountSummary());
    }

    @GetMapping("/{id}/events")
    public ResponseEntity<List<LifeEventResponse>> getAnimalEvents(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.getAnimalEvents(id));
    }
}

// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/service/impl/FarmServiceImpl.java
package com.farmoperations.livestock.service.impl;

import com.farmoperations.livestock.dto.FarmLocationDto;
import com.farmoperations.livestock.dto.NearbyFarmResponseDto;
import com.farmoperations.livestock.entity.Farm;
import com.farmoperations.livestock.repository.FarmRepository;
import com.farmoperations.livestock.repository.NearbyFarmProjection;
import com.farmoperations.livestock.service.ContactLinkHelper;
import com.farmoperations.livestock.service.FarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FarmServiceImpl implements FarmService {

    private final FarmRepository farmRepository;
    private final ContactLinkHelper contactLinkHelper;

    // Standard JTS GeometryFactory initialized with WGS 84 (SRID 4326)
    private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

    @Override
    @Transactional
    public NearbyFarmResponseDto registerFarm(FarmLocationDto dto) {
        log.info("Registering farm '{}' at coordinates ({}, {})", dto.getFarmName(), dto.getLatitude(), dto.getLongitude());

        // Note: In JTS Geometry, X = Longitude, Y = Latitude
        Point locationPoint = geometryFactory.createPoint(new Coordinate(dto.getLongitude(), dto.getLatitude()));

        Farm farm = Farm.builder()
            .farmName(dto.getFarmName().trim())
            .farmerName(dto.getFarmerName().trim())
            .phoneNumber(dto.getPhoneNumber().trim())
            .produceList(dto.getProduceList() != null ? new ArrayList<>(dto.getProduceList()) : new ArrayList<>())
            .location(locationPoint)
            .build();

        Farm saved = farmRepository.save(farm);

        return NearbyFarmResponseDto.builder()
            .id(saved.getId())
            .farmName(saved.getFarmName())
            .farmerName(saved.getFarmerName())
            .phoneNumber(saved.getPhoneNumber())
            .produceList(saved.getProduceList())
            .latitude(saved.getLocation().getY())
            .longitude(saved.getLocation().getX())
            .distanceKm(0.0)
            .directDialUrl(contactLinkHelper.generateDirectDialUrl(saved.getPhoneNumber()))
            .whatsappUrl(contactLinkHelper.generateWhatsAppUrl(saved.getPhoneNumber(), saved.getFarmerName(), saved.getFarmName()))
            .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<NearbyFarmResponseDto> getNearbyFarms(double latitude, double longitude, double radiusKm, String produce) {
        double radiusMeters = radiusKm * 1000.0;
        String cleanProduce = (produce != null && !produce.isBlank()) ? produce.trim() : null;

        log.debug("Querying nearby farms at ({}, {}) within {} km, produce filter: '{}'",
            latitude, longitude, radiusKm, cleanProduce);

        List<NearbyFarmProjection> projections = farmRepository.findNearbyFarmsWithFilter(
            latitude, longitude, radiusMeters, cleanProduce
        );

        if (projections.isEmpty()) {
            return List.of();
        }

        // Fetch produce list map for found farms to avoid N+1 queries
        List<UUID> farmIds = projections.stream().map(NearbyFarmProjection::getId).toList();
        Map<UUID, List<String>> produceMap = farmRepository.findAllById(farmIds)
            .stream()
            .collect(Collectors.toMap(Farm::getId, Farm::getProduceList));

        return projections.stream().map(p -> {
            List<String> produces = produceMap.getOrDefault(p.getId(), List.of());
            String dialUrl = contactLinkHelper.generateDirectDialUrl(p.getPhoneNumber());
            String waUrl = contactLinkHelper.generateWhatsAppUrl(p.getPhoneNumber(), p.getFarmerName(), p.getFarmName());

            return NearbyFarmResponseDto.builder()
                .id(p.getId())
                .farmName(p.getFarmName())
                .farmerName(p.getFarmerName())
                .phoneNumber(p.getPhoneNumber())
                .produceList(produces)
                .latitude(p.getLatitude())
                .longitude(p.getLongitude())
                .distanceKm(p.getDistanceKm())
                .directDialUrl(dialUrl)
                .whatsappUrl(waUrl)
                .build();
        }).toList();
    }
}

// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/repository/LifeEventRepository.java
package com.farmoperations.livestock.repository;

import com.farmoperations.livestock.entity.LifeEvent;
import com.farmoperations.livestock.model.LifeEventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LifeEventRepository extends JpaRepository<LifeEvent, Long> {

    List<LifeEvent> findByAnimalIdOrderByEventTimestampDesc(Long animalId);

    List<LifeEvent> findTop50ByOrderByEventTimestampDesc();

    long countByEventTypeAndEventTimestampAfter(LifeEventType eventType, LocalDateTime timestamp);
}

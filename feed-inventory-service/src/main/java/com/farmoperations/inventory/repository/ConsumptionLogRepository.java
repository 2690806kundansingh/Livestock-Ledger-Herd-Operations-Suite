// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/repository/ConsumptionLogRepository.java
package com.farmoperations.inventory.repository;

import com.farmoperations.inventory.entity.ConsumptionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsumptionLogRepository extends JpaRepository<ConsumptionLog, Long> {
    List<ConsumptionLog> findByFeedStockIdOrderByLoggedAtDesc(Long feedStockId);
    List<ConsumptionLog> findTop50ByOrderByLoggedAtDesc();
}

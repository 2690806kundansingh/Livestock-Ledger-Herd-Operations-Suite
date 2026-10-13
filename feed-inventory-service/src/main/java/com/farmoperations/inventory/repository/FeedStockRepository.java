// File: feed-inventory-service/src/main/java/com/farmoperations/inventory/repository/FeedStockRepository.java
package com.farmoperations.inventory.repository;

import com.farmoperations.inventory.entity.FeedStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedStockRepository extends JpaRepository<FeedStock, Long> {
    Optional<FeedStock> findByFeedName(String feedName);
}

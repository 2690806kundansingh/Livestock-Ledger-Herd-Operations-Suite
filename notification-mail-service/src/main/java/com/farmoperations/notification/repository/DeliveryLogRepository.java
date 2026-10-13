// File: notification-mail-service/src/main/java/com/farmoperations/notification/repository/DeliveryLogRepository.java
package com.farmoperations.notification.repository;

import com.farmoperations.notification.entity.DeliveryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DeliveryLogRepository extends JpaRepository<DeliveryLog, Long> {
    List<DeliveryLog> findTop50ByOrderByDispatchedAtDesc();
    List<DeliveryLog> findByDispatchedAtAfter(LocalDateTime date);
}

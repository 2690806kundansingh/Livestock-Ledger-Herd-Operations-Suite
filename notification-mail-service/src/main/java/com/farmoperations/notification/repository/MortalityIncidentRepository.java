// File: notification-mail-service/src/main/java/com/farmoperations/notification/repository/MortalityIncidentRepository.java
package com.farmoperations.notification.repository;

import com.farmoperations.notification.entity.MortalityIncident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MortalityIncidentRepository extends JpaRepository<MortalityIncident, Long> {
    long countByIncidentTimestampAfter(LocalDateTime timestamp);
    List<MortalityIncident> findByIncidentTimestampAfterOrderByIncidentTimestampDesc(LocalDateTime timestamp);
}

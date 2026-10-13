// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/repository/AnimalRepository.java
package com.farmoperations.livestock.repository;

import com.farmoperations.livestock.entity.Animal;
import com.farmoperations.livestock.model.AnimalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    Optional<Animal> findByTagNumber(String tagNumber);

    List<Animal> findByStatus(AnimalStatus status);

    long countByStatus(AnimalStatus status);

    long countByBirthDateAfter(LocalDate birthDate);

    @Query("SELECT COUNT(a) FROM Animal a WHERE a.status = :status AND a.birthDate >= :cutoffDate")
    long countJuveniles(AnimalStatus status, LocalDate cutoffDate);
}

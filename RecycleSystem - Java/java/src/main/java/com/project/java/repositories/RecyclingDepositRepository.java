package com.project.java.repositories;

import com.project.java.entities.RecyclingDeposit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecyclingDepositRepository extends JpaRepository<RecyclingDeposit, Long> {
    
    List<RecyclingDeposit> findByUserId(Long userId);
}
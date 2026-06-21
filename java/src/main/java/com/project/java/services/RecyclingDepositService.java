package com.project.java.services;

import com.project.java.dtos.RecyclingDepositDTO;
import java.util.List;
import java.util.Map;

public interface RecyclingDepositService {
    List<RecyclingDepositDTO> getAll();
    RecyclingDepositDTO create(RecyclingDepositDTO dto);
    void delete(Long id);


    List<Map<String, Object>> getLeaderboard();

 
    List<Map<String, Object>> getStatsByBottleType();

    double getTotalRefundForUser(Long userId);
}

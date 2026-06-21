package com.project.java.services;

import com.project.java.dtos.Mapper;
import com.project.java.dtos.RecyclingDepositDTO;
import com.project.java.entities.Bottle;
import com.project.java.entities.RecyclingDeposit;
import com.project.java.entities.User;
import com.project.java.exceptions.NotFoundException;
import com.project.java.repositories.BottleRepository;
import com.project.java.repositories.RecyclingDepositRepository;
import com.project.java.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecyclingDepositServiceImpl implements RecyclingDepositService {

    private final RecyclingDepositRepository depositRepository;
    private final UserRepository userRepository;
    private final BottleRepository bottleRepository;
    private final Mapper mapper;


    @Override
    public List<RecyclingDepositDTO> getAll() {
        return depositRepository.findAll().stream()
                .map(mapper::toRecyclingDepositDTO)
                .toList();
    }

    @Override
    @Transactional
    public RecyclingDepositDTO create(RecyclingDepositDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found: " + dto.getUserId()));
        Bottle bottle = bottleRepository.findById(dto.getBottleId())
                .orElseThrow(() -> new NotFoundException("Bottle not found: " + dto.getBottleId()));

        double totalRefund = bottle.getRefundValue() * dto.getQuantity();

        RecyclingDeposit deposit = new RecyclingDeposit();
        deposit.setUser(user);
        deposit.setBottle(bottle);
        deposit.setQuantity(dto.getQuantity());
        deposit.setTotalRefund(totalRefund);
        deposit.setDepositDate(LocalDateTime.now());

        user.setBalance(user.getBalance() + totalRefund);
        userRepository.save(user);

        return mapper.toRecyclingDepositDTO(depositRepository.save(deposit));
    }

    @Override
    public void delete(Long id) {
        if (!depositRepository.existsById(id))
            throw new NotFoundException("Deposit not found: " + id);
        depositRepository.deleteById(id);
    }

    @Override
    public List<Map<String, Object>> getLeaderboard() {
        return depositRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        d -> d.getUser().getName(),
                        Collectors.summingInt(RecyclingDeposit::getQuantity)
                ))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(3)
                .map(e -> Map.of("userName", (Object) e.getKey(), "totalBottles", e.getValue()))
                .toList();
    }

    @Override
    public List<Map<String, Object>> getStatsByBottleType() {
        return depositRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        d -> d.getBottle().getType(),
                        Collectors.summingInt(RecyclingDeposit::getQuantity)
                ))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .map(e -> Map.of("bottleType", (Object) e.getKey(), "totalQuantity", e.getValue()))
                .toList();
    }

    @Override
    public double getTotalRefundForUser(Long userId) {
        return depositRepository.findAll().stream()
                .filter(d -> d.getUser().getId().equals(userId))
                .mapToDouble(RecyclingDeposit::getTotalRefund)
                .sum();
    }
}

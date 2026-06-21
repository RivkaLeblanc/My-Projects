package com.project.java.controllers;

import com.project.java.dtos.RecyclingDepositDTO;
import com.project.java.services.RecyclingDepositService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deposits")
@CrossOrigin(origins = "http://localhost:3000")
public class RecyclingDepositController {

    private final RecyclingDepositService depositService;

    public RecyclingDepositController(RecyclingDepositService depositService) {
        this.depositService = depositService;
    }

    @GetMapping
    public List<RecyclingDepositDTO> getAll() {
        return depositService.getAll();
    }

    @PostMapping
    public RecyclingDepositDTO create(@RequestBody RecyclingDepositDTO dto) {
        return depositService.create(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        depositService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/leaderboard")
    public List<Map<String, Object>> getLeaderboard() {
        return depositService.getLeaderboard();
    }

    @GetMapping("/stats/by-bottle-type")
    public List<Map<String, Object>> getStatsByBottleType() {
        return depositService.getStatsByBottleType();
    }

    @GetMapping("/user/{userId}/total-refund")
    public double getTotalRefundForUser(@PathVariable Long userId) {
        return depositService.getTotalRefundForUser(userId);
    }
}

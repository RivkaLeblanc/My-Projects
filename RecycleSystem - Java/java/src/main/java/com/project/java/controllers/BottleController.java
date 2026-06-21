package com.project.java.controllers;

import com.project.java.dtos.BottleDTO;
import com.project.java.services.BottleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bottles")
@CrossOrigin(origins = "http://localhost:3000")
public class BottleController {

    private final BottleService bottleService;

    public BottleController(BottleService bottleService) {
        this.bottleService = bottleService;
    }

    @GetMapping
    public List<BottleDTO> getAll() {
        return bottleService.getAll();
    }

    @PostMapping
    public BottleDTO create(@RequestBody BottleDTO dto) {
        return bottleService.create(dto);
    }

    @PutMapping("/{id}")
    public BottleDTO update(@PathVariable Long id, @RequestBody BottleDTO dto) {
        return bottleService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bottleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

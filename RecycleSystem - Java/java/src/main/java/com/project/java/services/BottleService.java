package com.project.java.services;

import com.project.java.dtos.BottleDTO;
import java.util.List;

public interface BottleService {
    List<BottleDTO> getAll();
    BottleDTO create(BottleDTO dto);
    BottleDTO update(Long id, BottleDTO dto);
    void delete(Long id);
}

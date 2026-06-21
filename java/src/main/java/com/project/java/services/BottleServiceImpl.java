package com.project.java.services;

import com.project.java.dtos.BottleDTO;
import com.project.java.dtos.Mapper;
import com.project.java.entities.Bottle;
import com.project.java.exceptions.NotFoundException;
import com.project.java.repositories.BottleRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class BottleServiceImpl implements BottleService {

    private final BottleRepository bottleRepository;
    private final Mapper mapper;

   

    @Override
    public List<BottleDTO> getAll() {
        return bottleRepository.findAll().stream()
                .map(mapper::toBottleDTO)
                .toList();
    }

    @Override
    public BottleDTO create(BottleDTO dto) {
        Bottle bottle = new Bottle();
        bottle.setType(dto.getType());
        bottle.setRefundValue(dto.getRefundValue());
        return mapper.toBottleDTO(bottleRepository.save(bottle));
    }

    @Override
    public BottleDTO update(Long id, BottleDTO dto) {
        Bottle bottle = bottleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Bottle not found: " + id));
        bottle.setType(dto.getType());
        bottle.setRefundValue(dto.getRefundValue());
        return mapper.toBottleDTO(bottleRepository.save(bottle));
    }

    @Override
    public void delete(Long id) {
        if (!bottleRepository.existsById(id))
            throw new NotFoundException("Bottle not found: " + id);
        bottleRepository.deleteById(id);
    }
}

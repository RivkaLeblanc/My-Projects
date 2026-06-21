package com.project.java.services;

import com.project.java.dtos.UserDTO;
import java.util.List;

public interface UserService {
    List<UserDTO> getAll();
    UserDTO getById(Long id);
    UserDTO create(UserDTO dto);
    UserDTO update(Long id, UserDTO dto);
    UserDTO updateGoal(Long id, double goal);
    void delete(Long id);
    double getTotalBalance();
}

package com.project.java.services;

import com.project.java.dtos.Mapper;
import com.project.java.dtos.UserDTO;
import com.project.java.entities.User;
import com.project.java.exceptions.NotFoundException;
import com.project.java.repositories.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final Mapper mapper;

    public UserServiceImpl(UserRepository userRepository, Mapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }
    @Override
    public List<UserDTO> getAll() {
        return userRepository.findAll().stream()
                .map(mapper::toUserDTO)
                .toList();
    }

    @Override
    public UserDTO getById(Long id) {
        return userRepository.findById(id)
                .map(mapper::toUserDTO)
                .orElseThrow(() -> new NotFoundException("User not found: " + id));
    }

    @Override
    public UserDTO create(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail().toLowerCase());
        user.setPassword(dto.getPassword());
        user.setBalance(dto.getBalance());
        if (dto.getRole() != null) {
            user.setRole(User.Role.valueOf(dto.getRole()));
        }
        return mapper.toUserDTO(userRepository.save(user));
    }

    @Override
    public UserDTO update(Long id, UserDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found: " + id));
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setBalance(dto.getBalance());
        user.setGoal(dto.getGoal());
        return mapper.toUserDTO(userRepository.save(user));
    }

    @Override
    public UserDTO updateGoal(Long id, double goal) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found: " + id));
        user.setGoal(goal);
        return mapper.toUserDTO(userRepository.save(user));
    }

    @Override
    public void delete(Long id) {
        if (!userRepository.existsById(id))
            throw new NotFoundException("User not found: " + id);
        userRepository.deleteById(id);
    }

    @Override
    public double getTotalBalance() {
        return userRepository.findAll().stream()
                .mapToDouble(User::getBalance)
                .sum();
    }
}

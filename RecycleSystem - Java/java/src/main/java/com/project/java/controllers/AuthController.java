package com.project.java.controllers;

import com.project.java.dtos.UserDTO;
import com.project.java.entities.User;
import com.project.java.repositories.UserRepository;
import com.project.java.dtos.Mapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final Mapper mapper;

    public AuthController(UserRepository userRepository, Mapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        return userRepository.findByEmail(email.toLowerCase())
                .filter(u -> u.getPassword().equals(password))
                .map(u -> ResponseEntity.ok((Object) mapper.toUserDTO(u)))
                .orElse(ResponseEntity.status(401).body("Invalid email or password"));
    }
}

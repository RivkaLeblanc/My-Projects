package com.project.java.dtos;

import lombok.Data;

@Data

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private double balance;
    private double goal;
    private String role;
}

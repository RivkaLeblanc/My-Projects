package com.project.java.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String password;
    private String name;
    private String email;
    private double balance;
    private double goal;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    public enum Role { ADMIN, USER }

}

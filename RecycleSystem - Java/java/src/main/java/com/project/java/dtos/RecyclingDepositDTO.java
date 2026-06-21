package com.project.java.dtos;

import java.time.LocalDateTime;
import lombok.Data;

@Data

public class RecyclingDepositDTO {
    private Long id;
    private Long userId;
    private String userName;   
    private Long bottleId;  
    private int quantity;    
    private String bottleType;  
    private double totalRefund;
    private LocalDateTime depositDate;
}

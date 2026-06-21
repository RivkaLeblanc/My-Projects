package com.project.java.dtos;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;

import com.project.java.entities.Bottle;
import com.project.java.entities.RecyclingDeposit;
import com.project.java.entities.User;

@Component
public class Mapper {

    private final ModelMapper mapper = new ModelMapper();

    public Mapper() {
        TypeMap<RecyclingDeposit, RecyclingDepositDTO> depositMap =
            mapper.createTypeMap(RecyclingDeposit.class, RecyclingDepositDTO.class);

        depositMap.addMappings(m -> {
            m.map(src -> src.getUser().getId(),   RecyclingDepositDTO::setUserId);
            m.map(src -> src.getUser().getName(), RecyclingDepositDTO::setUserName);
            m.map(src -> src.getBottle().getId(),  RecyclingDepositDTO::setBottleId);
            m.map(src -> src.getBottle().getType(), RecyclingDepositDTO::setBottleType);
        });
    }

    public UserDTO toUserDTO(User user) {
        return mapper.map(user, UserDTO.class);
    }

    public BottleDTO toBottleDTO(Bottle bottle) {
        return mapper.map(bottle, BottleDTO.class);
    }

    public RecyclingDepositDTO toRecyclingDepositDTO(RecyclingDeposit deposit) {
        return mapper.map(deposit, RecyclingDepositDTO.class);
    }
}

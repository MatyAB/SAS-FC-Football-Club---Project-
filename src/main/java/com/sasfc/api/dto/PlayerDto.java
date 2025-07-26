package com.sasfc.api.dto;

import com.sasfc.api.model.enums.PlayerPosition;
import com.sasfc.api.model.enums.TeamCategory;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class PlayerDto {
    private UUID id;
    private String name;
    private PlayerPosition position;
    private int jerseyNumber;
    private int age;
    private String nationality;
    private String bio;
    private String imageUrl;
    private TeamCategory teamCategory;
    private Date joinedDate;
    private boolean isActive;
}

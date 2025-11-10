package com.sasfc.api.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class GoalDto {

    private Long id; 

    private UUID scorerPlayerId;
    private UUID assistPlayerId; 
    private String scorerName;
    private String assistPlayerName;
    private Integer minuteScored;
    private UUID teamId;
    private String teamName;
}
package com.sasfc.api.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class GoalDto {

    private Long id; // Useful for responses

    // For creating/updating, the client sends these IDs
    private UUID scorerPlayerId;
    private UUID assistPlayerId; // Can be null if there was no assist

    // For responses, we can include names for easier display on the front-end
    private String scorerName;
    private String assistPlayerName;

    private Integer minuteScored;
}
package com.sasfc.api.dto;

import com.sasfc.api.model.enums.PlayerPosition;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

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
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date joinedDate;
    private boolean isActive;

    // ======================================================
    // =========== NEW FIELDS FROM MODEL UPDATE =============
    // ======================================================

    private Double height;
    private Double weight;
    
    // Using String for the enum in the DTO is good practice for APIs
    private String preferredFoot; 

    // Overall career stats
    private Integer matchesPlayed;
    private Integer goalsScored;
    private Integer assists;
    private Integer cleanSheets;

    // Optional detailed stats
    private Double passAccuracy;
    private Double tackleSuccessRate;

    private String careerHighlights;

    private String imageUrl2;
    private String imageUrl3;

    // Team relation
    private UUID teamId; // for writes
    private TeamDto team; // for reads
}
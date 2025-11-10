package com.sasfc.api.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class TeamDto {
    private UUID id;
    private String name;
    private String shortName;
    private String logoUrl;
    private int foundedYear;
    private String homeStadium;
    private String category;
}

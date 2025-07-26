package com.sasfc.api.dto;

import com.sasfc.api.model.enums.TeamCategory;
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
    private TeamCategory category;
}

package com.sasfc.api.dto;

import com.sasfc.api.model.enums.MatchStatus;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class MatchRequestDto {

    private UUID homeTeamId;
    private UUID awayTeamId;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date matchDateTime;

    private String venue;
    private String competition;
    private Integer homeScore;
    private Integer awayScore;
    private MatchStatus status;
    private String matchReport;

    // The client sends the ID of the player who was Man of the Match
    private UUID manOfTheMatchPlayerId;

    // The client sends a list of goal events
    // For each goal, they only need to provide player IDs and the minute
    private List<GoalDto> goals;
}
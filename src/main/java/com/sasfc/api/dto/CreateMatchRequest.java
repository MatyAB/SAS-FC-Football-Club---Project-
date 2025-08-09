package com.sasfc.api.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class CreateMatchRequest {
    private UUID homeTeamId;
    private UUID awayTeamId;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date matchDateTime;
    private String venue;
    private String competition;
    private String status;
    private Integer homeScore;
    private Integer awayScore;
    private List<UUID> scorerIds;
}

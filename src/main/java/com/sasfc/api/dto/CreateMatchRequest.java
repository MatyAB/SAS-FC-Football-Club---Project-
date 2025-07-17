package com.sasfc.api.dto;

import java.util.Date;
import java.util.UUID;
import lombok.Data;

@Data
public class CreateMatchRequest {
    private UUID homeTeamId;
    private UUID awayTeamId;
    private Date matchDateTime;
    private String venue;
    private String competition;
    private String status;
}

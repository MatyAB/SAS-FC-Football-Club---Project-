package com.sasfc.api.dto;

import java.util.Date;
import java.util.UUID;
import com.sasfc.api.dto.TeamDto;

public class MatchDto {
    private UUID id;
    private TeamDto homeTeam;
    private TeamDto awayTeam;
    private Date matchDateTime;
    private String venue;
    private String competition;
    private Integer homeScore;
    private Integer awayScore;
    private String status;
    private String matchReport;
    // Getters and setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public TeamDto getHomeTeam() { return homeTeam; }
    public void setHomeTeam(TeamDto homeTeam) { this.homeTeam = homeTeam; }
    public TeamDto getAwayTeam() { return awayTeam; }
    public void setAwayTeam(TeamDto awayTeam) { this.awayTeam = awayTeam; }
    public Date getMatchDateTime() { return matchDateTime; }
    public void setMatchDateTime(Date matchDateTime) { this.matchDateTime = matchDateTime; }
    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }
    public String getCompetition() { return competition; }
    public void setCompetition(String competition) { this.competition = competition; }
    public Integer getHomeScore() { return homeScore; }
    public void setHomeScore(Integer homeScore) { this.homeScore = homeScore; }
    public Integer getAwayScore() { return awayScore; }
    public void setAwayScore(Integer awayScore) { this.awayScore = awayScore; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getMatchReport() { return matchReport; }
    public void setMatchReport(String matchReport) { this.matchReport = matchReport; }
} 
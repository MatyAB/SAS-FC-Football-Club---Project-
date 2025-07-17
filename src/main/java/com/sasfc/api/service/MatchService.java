package com.sasfc.api.service;

import com.sasfc.api.dto.CreateMatchRequest;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.model.Match;
import com.sasfc.api.model.Team;
import com.sasfc.api.repository.MatchRepository;
import com.sasfc.api.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MatchService {
    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private TeamRepository teamRepository;

    public Match createMatch(CreateMatchRequest request) {
        Team homeTeam = teamRepository.findById(request.getHomeTeamId())
            .orElseThrow(() -> new ResourceNotFoundException("Home team not found with id: " + request.getHomeTeamId()));
        
        Team awayTeam = teamRepository.findById(request.getAwayTeamId())
            .orElseThrow(() -> new ResourceNotFoundException("Away team not found with id: " + request.getAwayTeamId()));
        
        Match match = new Match();
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setMatchDateTime(request.getMatchDateTime());
        match.setVenue(request.getVenue());
        match.setCompetition(request.getCompetition());
        // match.setStatus(request.getStatus());

        return matchRepository.save(match);
    }
    
}
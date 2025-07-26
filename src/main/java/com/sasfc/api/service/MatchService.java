package com.sasfc.api.service;

import com.sasfc.api.dto.CreateMatchRequest;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.model.Match;
import com.sasfc.api.model.Team;
import com.sasfc.api.model.enums.MatchStatus;
import com.sasfc.api.repository.MatchRepository;
import com.sasfc.api.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MatchService {
    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private TeamRepository teamRepository;

    public Match createMatch(CreateMatchRequest request) {
        Team homeTeam = teamRepository.findByName(request.getHomeTeam())
            .orElseThrow(() -> new ResourceNotFoundException("Home team not found with name: " + request.getHomeTeam()));
        
        Team awayTeam = teamRepository.findByName(request.getAwayTeam())
            .orElseThrow(() -> new ResourceNotFoundException("Away team not found with name: " + request.getAwayTeam()));
        
        Match match = new Match();
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setMatchDateTime(request.getMatchDateTime());
        match.setVenue(request.getVenue());
        match.setCompetition(request.getCompetition());
        match.setStatus(MatchStatus.valueOf(request.getStatus().toUpperCase()));
        match.setHomeScore(request.getHomeScore());
        match.setAwayScore(request.getAwayScore());

        return matchRepository.save(match);
    }

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Match getMatchById(Long id) {
        return matchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Match not found with id: " + id));
    }

    public List<Match> getMatchesByStatus(MatchStatus status) {
        return matchRepository.findByStatus(status);
    }

    public Match updateMatch(Long id, CreateMatchRequest request) {
        Match existingMatch = matchRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Match not found with id: " + id));

        Team homeTeam = teamRepository.findByName(request.getHomeTeam())
            .orElseThrow(() -> new ResourceNotFoundException("Home team not found with name: " + request.getHomeTeam()));
        
        Team awayTeam = teamRepository.findByName(request.getAwayTeam())
            .orElseThrow(() -> new ResourceNotFoundException("Away team not found with name: " + request.getAwayTeam()));
        
        existingMatch.setHomeTeam(homeTeam);
        existingMatch.setAwayTeam(awayTeam);
        existingMatch.setMatchDateTime(request.getMatchDateTime());
        existingMatch.setVenue(request.getVenue());
        existingMatch.setCompetition(request.getCompetition());
        existingMatch.setStatus(MatchStatus.valueOf(request.getStatus().toUpperCase()));
        existingMatch.setHomeScore(request.getHomeScore());
        existingMatch.setAwayScore(request.getAwayScore());

        return matchRepository.save(existingMatch);
    }

    public void deleteMatch(Long id) {
        if (!matchRepository.existsById(id)) {
            throw new ResourceNotFoundException("Match not found with id: " + id);
        }
        matchRepository.deleteById(id);
    }
}

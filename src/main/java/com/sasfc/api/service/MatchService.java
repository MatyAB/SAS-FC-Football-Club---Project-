package com.sasfc.api.service;

import com.sasfc.api.dto.CreateMatchRequest;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.model.Match;
import com.sasfc.api.model.Player;
import com.sasfc.api.model.Team;
import com.sasfc.api.model.enums.MatchStatus;
import com.sasfc.api.repository.MatchRepository;
import com.sasfc.api.repository.PlayerRepository;
import com.sasfc.api.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class MatchService {
    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired // Injected PlayerRepository
    private PlayerRepository playerRepository;

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

        Team homeTeam = teamRepository.findById(request.getHomeTeamId())
            .orElseThrow(() -> new ResourceNotFoundException("Home team not found with id: " + request.getHomeTeamId()));
        
        Team awayTeam = teamRepository.findById(request.getAwayTeamId())
            .orElseThrow(() -> new ResourceNotFoundException("Away team not found with id: " + request.getAwayTeamId()));
        
        existingMatch.setHomeTeam(homeTeam);
        existingMatch.setAwayTeam(awayTeam);
        existingMatch.setMatchDateTime(request.getMatchDateTime());
        existingMatch.setVenue(request.getVenue());
        existingMatch.setCompetition(request.getCompetition());
        existingMatch.setStatus(MatchStatus.valueOf(request.getStatus().toUpperCase()));
        existingMatch.setHomeScore(request.getHomeScore());
        existingMatch.setAwayScore(request.getAwayScore());

        // Handle scorers: set the new list of scorers, overwriting any previous ones.
        List<Player> newScorers = null;
        if (request.getScorerIds() != null) {
            newScorers = request.getScorerIds().stream()
                .map(playerId -> playerRepository.findById(playerId)
                    .orElseThrow(() -> new ResourceNotFoundException("Player not found with id: " + playerId)))
                .collect(Collectors.toList());
        }
        existingMatch.setScorers(newScorers);

        return matchRepository.save(existingMatch);
    }

    public void deleteMatch(Long id) {
        if (!matchRepository.existsById(id)) {
            throw new ResourceNotFoundException("Match not found with id: " + id);
        }
        matchRepository.deleteById(id);
    }
}

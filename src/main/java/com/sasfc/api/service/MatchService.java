// package com.sasfc.api.service;

// import com.sasfc.api.dto.CreateMatchRequest;
// import com.sasfc.api.exception.ResourceNotFoundException;
// import com.sasfc.api.model.Match;
// import com.sasfc.api.model.Player;
// import com.sasfc.api.model.Team;
// import com.sasfc.api.model.enums.MatchStatus;
// import com.sasfc.api.repository.MatchRepository;
// import com.sasfc.api.repository.PlayerRepository;
// import com.sasfc.api.repository.TeamRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.stream.Collectors;


// @Service
// public class MatchService {
//     @Autowired
//     private MatchRepository matchRepository;
//     @Autowired
//     private TeamRepository teamRepository;
//     @Autowired // Injected PlayerRepository
//     private PlayerRepository playerRepository;

//     public Match createMatch(CreateMatchRequest request) {
//         Team homeTeam = teamRepository.findById(request.getHomeTeamId())
//             .orElseThrow(() -> new ResourceNotFoundException("Home team not found with id: " + request.getHomeTeamId()));
        
//         Team awayTeam = teamRepository.findById(request.getAwayTeamId())
//             .orElseThrow(() -> new ResourceNotFoundException("Away team not found with id: " + request.getAwayTeamId()));
        
//         Match match = new Match();
//         match.setHomeTeam(homeTeam);
//         match.setAwayTeam(awayTeam);
//         match.setMatchDateTime(request.getMatchDateTime());
//         match.setVenue(request.getVenue());
//         match.setCompetition(request.getCompetition());
//         match.setStatus(MatchStatus.valueOf(request.getStatus().toUpperCase()));
//         match.setHomeScore(request.getHomeScore());
//         match.setAwayScore(request.getAwayScore());

//         return matchRepository.save(match);
//     }

//     public List<Match> getAllMatches() {
//         return matchRepository.findAll();
//     }

//     public Match getMatchById(Long id) {
//         return matchRepository.findById(id)
//                 .orElseThrow(() -> new ResourceNotFoundException("Match not found with id: " + id));
//     }

//     public List<Match> getMatchesByStatus(MatchStatus status) {
//         return matchRepository.findByStatus(status);
//     }

//     public Match updateMatch(Long id, CreateMatchRequest request) {
//         Match existingMatch = matchRepository.findById(id)
//             .orElseThrow(() -> new ResourceNotFoundException("Match not found with id: " + id));

//         Team homeTeam = teamRepository.findById(request.getHomeTeamId())
//             .orElseThrow(() -> new ResourceNotFoundException("Home team not found with id: " + request.getHomeTeamId()));
        
//         Team awayTeam = teamRepository.findById(request.getAwayTeamId())
//             .orElseThrow(() -> new ResourceNotFoundException("Away team not found with id: " + request.getAwayTeamId()));
        
//         existingMatch.setHomeTeam(homeTeam);
//         existingMatch.setAwayTeam(awayTeam);
//         existingMatch.setMatchDateTime(request.getMatchDateTime());
//         existingMatch.setVenue(request.getVenue());
//         existingMatch.setCompetition(request.getCompetition());
//         existingMatch.setStatus(MatchStatus.valueOf(request.getStatus().toUpperCase()));
//         existingMatch.setHomeScore(request.getHomeScore());
//         existingMatch.setAwayScore(request.getAwayScore());

//         // Handle scorers: set the new list of scorers, overwriting any previous ones.
//         List<Player> newScorers = null;
//         if (request.getScorerIds() != null) {
//             newScorers = request.getScorerIds().stream()
//                 .map(playerId -> playerRepository.findById(playerId)
//                     .orElseThrow(() -> new ResourceNotFoundException("Player not found with id: " + playerId)))
//                 .collect(Collectors.toList());
//         }
//         existingMatch.setScorers(newScorers);

//         return matchRepository.save(existingMatch);
//     }

//     public void deleteMatch(Long id) {
//         if (!matchRepository.existsById(id)) {
//             throw new ResourceNotFoundException("Match not found with id: " + id);
//         }
//         matchRepository.deleteById(id);
//     }
// }
package com.sasfc.api.service;

import com.sasfc.api.dto.GoalDto;
import com.sasfc.api.dto.MatchRequestDto;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.model.Goal;
import com.sasfc.api.model.Match;
import com.sasfc.api.model.Player;
import com.sasfc.api.model.Team;
import com.sasfc.api.repository.MatchRepository;
import com.sasfc.api.repository.PlayerRepository;
import com.sasfc.api.repository.TeamRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchService {
    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private PlayerRepository playerRepository;

    // Use @Transactional to ensure all database operations succeed or fail together
    @Transactional
    public Match createMatch(MatchRequestDto request) {
        Team homeTeam = teamRepository.findById(request.getHomeTeamId())
            .orElseThrow(() -> new ResourceNotFoundException("Home team not found with id: " + request.getHomeTeamId()));

        Team awayTeam = teamRepository.findById(request.getAwayTeamId())
            .orElseThrow(() -> new ResourceNotFoundException("Away team not found with id: " + request.getAwayTeamId()));

        Match match = new Match();
        mapRequestDtoToMatch(match, request, homeTeam, awayTeam);

        return matchRepository.save(match);
    }

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Match getMatchById(Long id) {
        return matchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Match not found with id: " + id));
    }

    @Transactional
    public Match updateMatch(Long id, MatchRequestDto request) {
        Match existingMatch = getMatchById(id);

        Team homeTeam = teamRepository.findById(request.getHomeTeamId())
            .orElseThrow(() -> new ResourceNotFoundException("Home team not found with id: " + request.getHomeTeamId()));

        Team awayTeam = teamRepository.findById(request.getAwayTeamId())
            .orElseThrow(() -> new ResourceNotFoundException("Away team not found with id: " + request.getAwayTeamId()));

        // Clear old goals to replace them. orphanRemoval=true in Match entity will handle deletion.
        existingMatch.getGoals().clear();
        
        mapRequestDtoToMatch(existingMatch, request, homeTeam, awayTeam);

        return matchRepository.save(existingMatch);
    }

    public void deleteMatch(Long id) {
        if (!matchRepository.existsById(id)) {
            throw new ResourceNotFoundException("Match not found with id: " + id);
        }
        matchRepository.deleteById(id);
    }

    // Helper method to map DTO to the Match entity (for both create and update)
    private void mapRequestDtoToMatch(Match match, MatchRequestDto request, Team homeTeam, Team awayTeam) {
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setMatchDateTime(request.getMatchDateTime());
        match.setVenue(request.getVenue());
        match.setCompetition(request.getCompetition());
        match.setStatus(request.getStatus());
        match.setHomeScore(request.getHomeScore());
        match.setAwayScore(request.getAwayScore());
        match.setMatchReport(request.getMatchReport());

        // Handle Man of the Match
        if (request.getManOfTheMatchPlayerId() != null) {
            Player motmPlayer = playerRepository.findById(request.getManOfTheMatchPlayerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Man of the Match player not found with id: " + request.getManOfTheMatchPlayerId()));
            match.setManOfTheMatch(motmPlayer);
        } else {
            match.setManOfTheMatch(null);
        }

        // Handle the new Goal entities
        if (request.getGoals() != null && !request.getGoals().isEmpty()) {
            List<Goal> goalEntities = request.getGoals().stream()
                .map(goalDto -> {
                    Goal goal = new Goal();
                    
                    Player scorer = playerRepository.findById(goalDto.getScorerPlayerId())
                        .orElseThrow(() -> new ResourceNotFoundException("Scorer player not found with id: " + goalDto.getScorerPlayerId()));
                    goal.setScorer(scorer);
                    
                    if (goalDto.getAssistPlayerId() != null) {
                        Player assistant = playerRepository.findById(goalDto.getAssistPlayerId())
                            .orElseThrow(() -> new ResourceNotFoundException("Assisting player not found with id: " + goalDto.getAssistPlayerId()));
                        goal.setAssistedBy(assistant);
                    }
                    
                    goal.setMinuteScored(goalDto.getMinuteScored());
                    // IMPORTANT: Set the relationship back to the match
                    goal.setMatch(match); 
                    return goal;
                }).collect(Collectors.toList());
            
            // If the goal list on the match is null, initialize it
            if (match.getGoals() == null) {
                match.setGoals(new ArrayList<>());
            }
            match.getGoals().addAll(goalEntities);
        }
    }
}
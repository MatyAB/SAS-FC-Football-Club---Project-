package com.sasfc.api.controller;

import com.sasfc.api.dto.GoalDto;
import com.sasfc.api.dto.MatchDto;
import com.sasfc.api.dto.MatchRequestDto;
import com.sasfc.api.dto.TeamDto;
import com.sasfc.api.model.Match;
import com.sasfc.api.model.Player;
import com.sasfc.api.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;

    // Use @RequestBody to accept JSON data, which is standard for complex objects
    @PostMapping
    public ResponseEntity<MatchDto> createMatch(@RequestBody MatchRequestDto request) {
        Match createdMatch = matchService.createMatch(request);
        return new ResponseEntity<>(toMatchDto(createdMatch), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MatchDto>> getAllMatches() {
        List<Match> matches = matchService.getAllMatches();
        // Convert the list of Match entities to a list of MatchDtos
        List<MatchDto> matchDtos = matches.stream()
                                          .map(this::toMatchDto)
                                          .collect(Collectors.toList());
        return ResponseEntity.ok(matchDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchDto> getMatchById(@PathVariable Long id) {
        Match match = matchService.getMatchById(id);
        return ResponseEntity.ok(toMatchDto(match));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MatchDto> updateMatch(@PathVariable Long id, @RequestBody MatchRequestDto request) {
        Match updatedMatch = matchService.updateMatch(id, request);
        return ResponseEntity.ok(toMatchDto(updatedMatch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
        return ResponseEntity.noContent().build();
    }
    
    // --- Private Helper Methods to map Entities to DTOs for API responses ---

    private MatchDto toMatchDto(Match match) {
        MatchDto dto = new MatchDto();
        dto.setId(match.getId());
        dto.setHomeTeam(toTeamDto(match.getHomeTeam()));
        dto.setAwayTeam(toTeamDto(match.getAwayTeam()));
        dto.setMatchDateTime(match.getMatchDateTime());
        dto.setVenue(match.getVenue());
        dto.setCompetition(match.getCompetition());
        dto.setHomeScore(match.getHomeScore());
        dto.setAwayScore(match.getAwayScore());
        dto.setStatus(match.getStatus().name());
        dto.setMatchReport(match.getMatchReport());

        // Map the nested Player object for Man of the Match
        if (match.getManOfTheMatch() != null) {
            dto.setManOfTheMatch(toPlayerDto(match.getManOfTheMatch()));
        }

        // Map the list of Goal entities to GoalDtos
        if (match.getGoals() != null) {
            dto.setGoals(match.getGoals().stream().map(goal -> {
                GoalDto goalDto = new GoalDto();
                goalDto.setId(goal.getId());
                goalDto.setMinuteScored(goal.getMinuteScored());
                if (goal.getScorer() != null) {
                    goalDto.setScorerPlayerId(goal.getScorer().getId());
                    goalDto.setScorerName(goal.getScorer().getName());
                }
                if (goal.getAssistedBy() != null) {
                    goalDto.setAssistPlayerId(goal.getAssistedBy().getId());
                    goalDto.setAssistPlayerName(goal.getAssistedBy().getName());
                }
                return goalDto;
            }).collect(Collectors.toList()));
        } else {
            dto.setGoals(Collections.emptyList());
        }

        return dto;
    }
    
    // This is a simplified Player to DTO mapper for use within the Match DTO.
    // Assuming a full PlayerDto is desired for Man of the Match.
    private com.sasfc.api.dto.PlayerDto toPlayerDto(Player player) {
        com.sasfc.api.dto.PlayerDto dto = new com.sasfc.api.dto.PlayerDto();
        dto.setId(player.getId());
        dto.setName(player.getName());
        dto.setPosition(player.getPosition());
        dto.setJerseyNumber(player.getJerseyNumber());
        dto.setImageUrl(player.getImageUrl());
        // Add other fields as needed
        return dto;
    }

    // Assuming you have a TeamDto and a way to map it
    private TeamDto toTeamDto(com.sasfc.api.model.Team team) {
        TeamDto dto = new TeamDto();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setLogoUrl(team.getLogoUrl());
        // Add other fields as needed
        return dto;
    }
}
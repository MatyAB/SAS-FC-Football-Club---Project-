package com.sasfc.api.controller;

import com.sasfc.api.dto.TeamDto;
import com.sasfc.api.model.Team;
import com.sasfc.api.model.enums.TeamCategory;
import com.sasfc.api.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Team> createTeam(@ModelAttribute TeamDto teamDto, @RequestParam(value = "teamLogo", required = false) MultipartFile teamLogo) {
        Team createdTeam = teamService.createTeam(teamDto);
        return new ResponseEntity<>(createdTeam, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TeamDto>> getAllTeams() {
        List<TeamDto> teams = teamService.getAllTeams();
        return ResponseEntity.ok(teams);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamDto> getTeamById(@PathVariable UUID id) {
        TeamDto team = teamService.getTeamById(id);
        return ResponseEntity.ok(team);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable UUID id, @RequestBody TeamDto teamDto) {
        Team updatedTeam = teamService.updateTeam(id, teamDto);
        return ResponseEntity.ok(updatedTeam);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable UUID id) {
        teamService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }

    
    @GetMapping("/categories")
    public ResponseEntity<List<TeamCategory>> getTeamCategories() {
        return ResponseEntity.ok(List.of(TeamCategory.values()));
    }

    @GetMapping("/categories/{categoryName}")
    public ResponseEntity<TeamCategory> getTeamCategoryByName(@PathVariable String categoryName) {
        try {
            TeamCategory category = TeamCategory.valueOf(categoryName.toUpperCase());
            return ResponseEntity.ok(category);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Or throw a specific exception
        }
    }

}

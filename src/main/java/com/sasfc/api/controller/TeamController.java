package com.sasfc.api.controller;

import com.sasfc.api.dto.TeamDto;
import com.sasfc.api.model.Team;
import com.sasfc.api.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody TeamDto teamDto) {
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
}

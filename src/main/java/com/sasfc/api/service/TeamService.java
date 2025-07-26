package com.sasfc.api.service;

import com.sasfc.api.dto.TeamDto;
import com.sasfc.api.exception.DuplicateResourceException;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.model.Team;
import com.sasfc.api.model.enums.TeamCategory;
import com.sasfc.api.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public Team createTeam(TeamDto teamDto) {
        if (teamRepository.findByName(teamDto.getName()).isPresent()) {
            throw new DuplicateResourceException("Team with name " + teamDto.getName() + " already exists.");
        }
        Team team = new Team();
        team.setName(teamDto.getName());
        team.setShortName(teamDto.getShortName());
        team.setLogoUrl(teamDto.getLogoUrl());
        team.setFoundedYear(teamDto.getFoundedYear());
        team.setHomeStadium(teamDto.getHomeStadium());
        team.setCategory(teamDto.getCategory());
        return teamRepository.save(team);
    }

    public List<TeamDto> getAllTeams() {
        return teamRepository.findAll().stream()
                .map(this::toTeamDto)
                .collect(Collectors.toList());
    }

    public TeamDto getTeamById(UUID id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));
        return toTeamDto(team);
    }

    public Team updateTeam(UUID id, TeamDto teamDto) {
        Team existingTeam = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));

        existingTeam.setName(teamDto.getName());
        existingTeam.setShortName(teamDto.getShortName());
        existingTeam.setLogoUrl(teamDto.getLogoUrl());
        existingTeam.setFoundedYear(teamDto.getFoundedYear());
        existingTeam.setHomeStadium(teamDto.getHomeStadium());
        existingTeam.setCategory(teamDto.getCategory());
        return teamRepository.save(existingTeam);
    }

    public void deleteTeam(UUID id) {
        if (!teamRepository.existsById(id)) {
            throw new ResourceNotFoundException("Team not found with id: " + id);
        }
        teamRepository.deleteById(id);
    }

    private TeamDto toTeamDto(Team team) {
        TeamDto dto = new TeamDto();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setShortName(team.getShortName());
        dto.setLogoUrl(team.getLogoUrl());
        dto.setFoundedYear(team.getFoundedYear());
        dto.setHomeStadium(team.getHomeStadium());
        dto.setCategory(team.getCategory());
        return dto;
    }
}

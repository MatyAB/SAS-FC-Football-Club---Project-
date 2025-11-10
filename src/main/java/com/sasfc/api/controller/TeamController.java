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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.io.IOException;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Team> createTeam(@ModelAttribute TeamDto teamDto, @RequestParam(value = "teamLogo", required = false) MultipartFile teamLogo) {
        // Handle optional logo upload and set logoUrl on DTO
        if (teamLogo != null && !teamLogo.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + teamLogo.getOriginalFilename();
            Path uploadPath = Paths.get("uploads", fileName);
            try {
                Files.createDirectories(uploadPath.getParent());
                Files.copy(teamLogo.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
                teamDto.setLogoUrl("http://localhost:8080/uploads/" + fileName);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
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

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Team> updateTeam(@PathVariable UUID id,
                                           @ModelAttribute TeamDto teamDto,
                                           @RequestParam(value = "teamLogo", required = false) MultipartFile teamLogo) {
        if (teamLogo != null && !teamLogo.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + teamLogo.getOriginalFilename();
            Path uploadPath = Paths.get("uploads", fileName);
            try {
                Files.createDirectories(uploadPath.getParent());
                Files.copy(teamLogo.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
                teamDto.setLogoUrl("http://localhost:8080/uploads/" + fileName);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        Team updatedTeam = teamService.updateTeam(id, teamDto);
        return ResponseEntity.ok(updatedTeam);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable UUID id) {
        teamService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }

    
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getTeamCategories() {
        return ResponseEntity.ok(List.of("First Team", "Youth", "Staff"));
    }

    @GetMapping("/categories/{categoryName}")
    public ResponseEntity<String> getTeamCategoryByName(@PathVariable String categoryName) {
        List<String> categories = List.of("First Team", "Youth", "Staff");
        String category = categories.stream()
            .filter(c -> c.equalsIgnoreCase(categoryName))
            .findFirst()
            .orElse(null);
        if (category != null) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

}

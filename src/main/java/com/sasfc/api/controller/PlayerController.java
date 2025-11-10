package com.sasfc.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sasfc.api.dto.PlayerDto;
import com.sasfc.api.model.Player;
import com.sasfc.api.model.enums.PreferredFoot;
import com.sasfc.api.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private ObjectMapper objectMapper; // Add this

    // The request to this endpoint will be of type "multipart/form-data"
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PlayerDto> createPlayer(
            @RequestPart("player") String playerJson, // Change to String
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestPart(value = "image2", required = false) MultipartFile image2,
            @RequestPart(value = "image3", required = false) MultipartFile image3) {

        PlayerDto playerDto;
        try {
            playerDto = objectMapper.readValue(playerJson, PlayerDto.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        Player createdPlayer = playerService.createPlayer(playerDto, image, image2, image3);
        // It's best practice to return the DTO representation
        return new ResponseEntity<>(toPlayerDto(createdPlayer), HttpStatus.CREATED);
    }

    @PostMapping("/actions/test-upload")
    public ResponseEntity<String> testUpload(
            @RequestParam("name") String name,
            @RequestParam("file") MultipartFile file) {
        
        // If the code reaches here, the upload was successful.
        String response = "SUCCESS! Received name: '" + name + "' and file: '" + file.getOriginalFilename() + "'";
        System.out.println(response); // Log to console
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PlayerDto>> getAllPlayers() {
        // The service already returns a list of DTOs, so no conversion is needed here.
        List<PlayerDto> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerDto> getPlayerById(@PathVariable UUID id) {
        // The service already returns a DTO.
        PlayerDto player = playerService.getPlayerById(id);
        return ResponseEntity.ok(player);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PlayerDto> updatePlayer(
            @PathVariable UUID id,
            @RequestPart("player") String playerJson, // Change to String
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestPart(value = "image2", required = false) MultipartFile image2,
            @RequestPart(value = "image3", required = false) MultipartFile image3) {

        PlayerDto playerDto;
        try {
            playerDto = objectMapper.readValue(playerJson, PlayerDto.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        Player updatedPlayer = playerService.updatePlayer(id, playerDto, image, image2, image3);
        return ResponseEntity.ok(toPlayerDto(updatedPlayer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable UUID id) {
        playerService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }
    
    // Private helper method to convert Player Entity to PlayerDto for responses
    // This ensures a consistent API response format
    private PlayerDto toPlayerDto(Player player) {
        PlayerDto dto = new PlayerDto();
        dto.setId(player.getId());
        dto.setName(player.getName());
        dto.setPosition(player.getPosition());
        dto.setTeamCategory(player.getTeamCategory());
        dto.setJerseyNumber(player.getJerseyNumber());
        dto.setAge(player.getAge());
        dto.setNationality(player.getNationality());
        dto.setBio(player.getBio());
        dto.setImageUrl(player.getImageUrl());
        dto.setJoinedDate(player.getJoinedDate());
        dto.setActive(player.isActive());
        dto.setHeight(player.getHeight());
        dto.setWeight(player.getWeight());
        if (player.getPreferredFoot() != null) {
            dto.setPreferredFoot(player.getPreferredFoot().name());
        }
        dto.setMatchesPlayed(player.getMatchesPlayed());
        dto.setGoalsScored(player.getGoalsScored());
        dto.setAssists(player.getAssists());
        dto.setCleanSheets(player.getCleanSheets());
        dto.setPassAccuracy(player.getPassAccuracy());
        dto.setTackleSuccessRate(player.getTackleSuccessRate());
        dto.setCareerHighlights(player.getCareerHighlights());
        dto.setImageUrl2(player.getImageUrl2());
        dto.setImageUrl3(player.getImageUrl3());

        // Staff-specific fields
        dto.setStaffId(player.getStaffId());
        dto.setRole(player.getRole());
        dto.setSpecialization(player.getSpecialization());
        dto.setYearsOfExperience(player.getYearsOfExperience());
        dto.setQualifications(player.getQualifications());
        dto.setCoachingLicense(player.getCoachingLicense());
        dto.setPreviousClubs(player.getPreviousClubs());
        dto.setPlayersTrained(player.getPlayersTrained());
        dto.setSuccessRate(player.getSuccessRate());
        dto.setTeamWinRate(player.getTeamWinRate());
        dto.setCoachingEffectiveness(player.getCoachingEffectiveness());
        dto.setPlayerDevelopment(player.getPlayerDevelopment());
        dto.setExpertiseLevel(player.getExpertiseLevel());
        dto.setCareerAchievements(player.getCareerAchievements());

        if (player.getTeam() != null) {
            com.sasfc.api.dto.TeamDto t = new com.sasfc.api.dto.TeamDto();
            t.setId(player.getTeam().getId());
            t.setName(player.getTeam().getName());
            t.setLogoUrl(player.getTeam().getLogoUrl());
            dto.setTeam(t);
        }
        return dto;
    }
}
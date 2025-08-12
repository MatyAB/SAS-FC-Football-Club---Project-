package com.sasfc.api.controller;

import com.sasfc.api.dto.PlayerDto;
import com.sasfc.api.model.Player;
import com.sasfc.api.model.enums.PreferredFoot;
import com.sasfc.api.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    // The request to this endpoint will be of type "multipart/form-data"
    @PostMapping
    public ResponseEntity<PlayerDto> createPlayer(
            @ModelAttribute PlayerDto playerDto,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "image2", required = false) MultipartFile image2,
            @RequestParam(value = "image3", required = false) MultipartFile image3) {
        
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

    @PutMapping("/{id}")
    public ResponseEntity<PlayerDto> updatePlayer(
            @PathVariable UUID id, 
            @ModelAttribute PlayerDto playerDto, 
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "image2", required = false) MultipartFile image2,
            @RequestParam(value = "image3", required = false) MultipartFile image3) {
        
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
        dto.setJerseyNumber(player.getJerseyNumber());
        dto.setAge(player.getAge());
        dto.setNationality(player.getNationality());
        dto.setBio(player.getBio());
        dto.setImageUrl(player.getImageUrl());
        dto.setTeamCategory(player.getTeamCategory());
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
        return dto;
    }
}
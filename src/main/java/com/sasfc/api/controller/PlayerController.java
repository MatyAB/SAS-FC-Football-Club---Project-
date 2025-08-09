package com.sasfc.api.controller;

import com.sasfc.api.dto.PlayerDto;
import com.sasfc.api.model.Player;
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

    @PostMapping
    public ResponseEntity<Player> createPlayer(@ModelAttribute PlayerDto playerDto, @RequestParam("image") MultipartFile image) {
        Player createdPlayer = playerService.createPlayer(playerDto, image);
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PlayerDto>> getAllPlayers() {
        List<PlayerDto> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerDto> getPlayerById(@PathVariable UUID id) {
        PlayerDto player = playerService.getPlayerById(id);
        return ResponseEntity.ok(player);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable UUID id, @ModelAttribute PlayerDto playerDto, @RequestParam(value = "image", required = false) MultipartFile image) {
        Player updatedPlayer = playerService.updatePlayer(id, playerDto, image);
        return ResponseEntity.ok(updatedPlayer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable UUID id) {
        playerService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }
}
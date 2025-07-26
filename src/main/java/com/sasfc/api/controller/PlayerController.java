package com.sasfc.api.controller;

import com.sasfc.api.dto.PlayerDto;
import com.sasfc.api.model.Player;
import com.sasfc.api.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody PlayerDto playerDto) {
        Player createdPlayer = playerService.createPlayer(playerDto);
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
    public ResponseEntity<Player> updatePlayer(@PathVariable UUID id, @RequestBody PlayerDto playerDto) {
        Player updatedPlayer = playerService.updatePlayer(id, playerDto);
        return ResponseEntity.ok(updatedPlayer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable UUID id) {
        playerService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }
}

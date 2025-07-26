package com.sasfc.api.controller;

import com.sasfc.api.dto.CreateMatchRequest;
import com.sasfc.api.model.Match;
import com.sasfc.api.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @PostMapping
    public ResponseEntity<Match> createMatch(@RequestBody CreateMatchRequest request) {
        Match createdMatch = matchService.createMatch(request);
        return new ResponseEntity<>(createdMatch, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches() {
        List<Match> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        Match match = matchService.getMatchById(id);
        return ResponseEntity.ok(match);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Match> updateMatch(@PathVariable Long id, @RequestBody CreateMatchRequest request) {
        Match updatedMatch = matchService.updateMatch(id, request);
        return ResponseEntity.ok(updatedMatch);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
        return ResponseEntity.noContent().build();
    }
}

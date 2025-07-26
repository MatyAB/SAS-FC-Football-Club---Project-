package com.sasfc.api.service;

import com.sasfc.api.dto.PlayerDto;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.model.Player;
import com.sasfc.api.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public Player createPlayer(PlayerDto playerDto) {
        Player player = new Player();
        player.setName(playerDto.getName());
        player.setPosition(playerDto.getPosition());
        player.setJerseyNumber(playerDto.getJerseyNumber());
        player.setAge(playerDto.getAge());
        player.setNationality(playerDto.getNationality());
        player.setBio(playerDto.getBio());
        player.setImageUrl(playerDto.getImageUrl());
        player.setTeamCategory(playerDto.getTeamCategory());
        player.setJoinedDate(playerDto.getJoinedDate());
        player.setActive(playerDto.isActive());
        return playerRepository.save(player);
    }

    public List<PlayerDto> getAllPlayers() {
        return playerRepository.findAll().stream()
                .map(this::toPlayerDto)
                .collect(Collectors.toList());
    }

    public PlayerDto getPlayerById(UUID id) {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Player not found with id: " + id));
        return toPlayerDto(player);
    }

    public Player updatePlayer(UUID id, PlayerDto playerDto) {
        Player existingPlayer = playerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Player not found with id: " + id));

        existingPlayer.setName(playerDto.getName());
        existingPlayer.setPosition(playerDto.getPosition());
        existingPlayer.setJerseyNumber(playerDto.getJerseyNumber());
        existingPlayer.setAge(playerDto.getAge());
        existingPlayer.setNationality(playerDto.getNationality());
        existingPlayer.setBio(playerDto.getBio());
        existingPlayer.setImageUrl(playerDto.getImageUrl());
        existingPlayer.setTeamCategory(playerDto.getTeamCategory());
        existingPlayer.setJoinedDate(playerDto.getJoinedDate());
        existingPlayer.setActive(playerDto.isActive());
        return playerRepository.save(existingPlayer);
    }

    public void deletePlayer(UUID id) {
        if (!playerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Player not found with id: " + id);
        }
        playerRepository.deleteById(id);
    }

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
        return dto;
    }
}

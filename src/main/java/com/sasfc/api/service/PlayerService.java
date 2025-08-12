// 

package com.sasfc.api.service;

import com.sasfc.api.dto.PlayerDto;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.model.Player;
import com.sasfc.api.model.enums.PreferredFoot;
import com.sasfc.api.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private FileStorageService fileStorageService; // Assuming you have this service for file uploads

    // Helper method to save an image and get its URL
    private String storeAndGetFileUri(MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            String fileName = fileStorageService.storeFile(file);
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(fileName)
                    .toUriString();
        }
        return null;
    }

    public Player createPlayer(PlayerDto playerDto, MultipartFile image, MultipartFile image2, MultipartFile image3) {
        Player player = new Player();
        // Use a private method to map DTO to Entity to avoid code duplication
        fromDtoToEntity(player, playerDto); 

        // Handle image uploads
        player.setImageUrl(storeAndGetFileUri(image));
        player.setImageUrl2(storeAndGetFileUri(image2));
        player.setImageUrl3(storeAndGetFileUri(image3));

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

    public Player updatePlayer(UUID id, PlayerDto playerDto, MultipartFile image, MultipartFile image2, MultipartFile image3) {
        Player existingPlayer = playerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Player not found with id: " + id));

        fromDtoToEntity(existingPlayer, playerDto);

        // Handle image updates
        String imageUrl1 = storeAndGetFileUri(image);
        if (imageUrl1 != null) existingPlayer.setImageUrl(imageUrl1);

        String imageUrl2 = storeAndGetFileUri(image2);
        if (imageUrl2 != null) existingPlayer.setImageUrl2(imageUrl2);

        String imageUrl3 = storeAndGetFileUri(image3);
        if (imageUrl3 != null) existingPlayer.setImageUrl3(imageUrl3);

        return playerRepository.save(existingPlayer);
    }

    public void deletePlayer(UUID id) {
        if (!playerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Player not found with id: " + id);
        }
        playerRepository.deleteById(id);
    }

    // Mapper from Entity to DTO
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

        // --- MAPPING NEW FIELDS ---
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

    // Mapper from DTO to Entity (for create/update)
    private void fromDtoToEntity(Player player, PlayerDto dto) {
        player.setName(dto.getName());
        player.setPosition(dto.getPosition());
        player.setJerseyNumber(dto.getJerseyNumber());
        player.setAge(dto.getAge());
        player.setNationality(dto.getNationality());
        player.setBio(dto.getBio());
        player.setTeamCategory(dto.getTeamCategory());
        player.setJoinedDate(dto.getJoinedDate());
        player.setActive(dto.isActive());

        // --- MAPPING NEW FIELDS ---
        player.setHeight(dto.getHeight());
        player.setWeight(dto.getWeight());
        if (dto.getPreferredFoot() != null) {
            player.setPreferredFoot(PreferredFoot.valueOf(dto.getPreferredFoot().toUpperCase()));
        }
        player.setMatchesPlayed(dto.getMatchesPlayed());
        player.setGoalsScored(dto.getGoalsScored());
        player.setAssists(dto.getAssists());
        player.setCleanSheets(dto.getCleanSheets());
        player.setPassAccuracy(dto.getPassAccuracy());
        player.setTackleSuccessRate(dto.getTackleSuccessRate());
        player.setCareerHighlights(dto.getCareerHighlights());
    }
}
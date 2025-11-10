package com.sasfc.api.repository;

import com.sasfc.api.model.Player;
import com.sasfc.api.model.enums.PlayerPosition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PlayerRepository extends JpaRepository<Player, UUID> {

    List<Player> findByPosition(PlayerPosition position);

    // Find all players in a specific team category (e.g., Senior, U-21)
    List<Player> findByTeamCategory(String teamCategory);
    
    // Find all active or inactive players
    List<Player> findByIsActive(boolean isActive);
}

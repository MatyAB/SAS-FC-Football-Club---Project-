package com.sasfc.api.repository;

import com.sasfc.api.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

    // --- Example Custom Queries you might want later ---

    // Find all goals scored by a specific player
    List<Goal> findByScorerId(UUID scorerPlayerId);

    // Find all goals assisted by a specific player
    List<Goal> findByAssistedById(UUID assistPlayerId);

    // Find all goals scored in a specific match
    List<Goal> findByMatchId(Long matchId);
}
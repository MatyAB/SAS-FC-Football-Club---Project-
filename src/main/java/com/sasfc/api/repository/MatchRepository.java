package com.sasfc.api.repository;

import com.sasfc.api.model.Match;
import com.sasfc.api.model.enums.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByStatusOrderByMatchDateTimeAsc(MatchStatus status);
    List<Match> findByStatusOrderByMatchDateTimeDesc(MatchStatus status);


    List<Match> findByStatusAndMatchDateTimeAfterOrderByMatchDateTimeAsc(MatchStatus status, Date currentDate);
    List<Match> findByStatus(MatchStatus status);


    // --- RECOMMENDED NEW METHODS ---

    // Find all matches where a specific player was the Man of the Match
    List<Match> findByManOfTheMatchId(UUID playerId);

    // Find all matches for a specific team (whether they were home or away)
    List<Match> findByHomeTeamIdOrAwayTeamId(UUID homeTeamId, UUID awayTeamId);

}
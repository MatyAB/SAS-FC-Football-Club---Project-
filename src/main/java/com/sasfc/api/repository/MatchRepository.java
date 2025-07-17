package com.sasfc.api.repository;

import com.sasfc.api.model.Match;
import com.sasfc.api.model.enums.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface MatchRepository extends JpaRepository<Match, UUID> {
    List<Match> findByStatusOrderByMatchDateTimeAsc(MatchStatus status);
    List<Match> findByStatusOrderByMatchDateTimeDesc(MatchStatus status);

    List<Match> findByStatusAndMatchDateTimeAfterOrderByMatchDateTimeAsc(MatchStatus status, Date currentDate);
}
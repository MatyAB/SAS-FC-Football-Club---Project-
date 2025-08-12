package com.sasfc.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "goals")
@Getter
@Setter
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scorer_player_id", nullable = false)
    private Player scorer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assist_player_id") // An assist is optional, so nullable is true by default
    private Player assistedBy;

    @Column(nullable = false)
    private Integer minuteScored; // e.g., 43 for the 43rd minute

    // You could add more details here if needed, like:
    // private boolean isPenalty;
    // private boolean isOwnGoal;
}
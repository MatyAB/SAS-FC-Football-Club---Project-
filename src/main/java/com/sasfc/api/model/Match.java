package com.sasfc.api.model;

import com.sasfc.api.model.enums.MatchStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;


@Entity
@Table(name = "matches")
@Getter
@Setter
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "home_team_id", nullable = false)
    private Team homeTeam;

    @ManyToOne
    @JoinColumn(name = "away_team_id", nullable = false)
    private Team awayTeam;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date matchDateTime;

    @Column(nullable = false)
    private String venue;

    private String competition;
    private Integer homeScore;
    private Integer awayScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MatchStatus status;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String matchReport;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}

// package com.sasfc.api.model;

// import com.sasfc.api.model.enums.MatchStatus;
// import jakarta.persistence.*;
// import lombok.Getter;
// import lombok.Setter;
// import java.util.Date;
// import java.util.List;


// @Entity
// @Table(name = "matches")
// @Getter
// @Setter
// public class Match {

//     @Id
//     @GeneratedValue(strategy = GenerationType.AUTO)
//     private Long id;

//     @ManyToOne
//     @JoinColumn(name = "home_team_id", nullable = false)
//     private Team homeTeam;

//     @ManyToOne
//     @JoinColumn(name = "away_team_id", nullable = false)
//     private Team awayTeam;

//     @Temporal(TemporalType.TIMESTAMP)
//     @Column(nullable = false)
//     private Date matchDateTime;

//     @Column(nullable = false)
//     private String venue;

//     private String competition;
//     private Integer homeScore;
//     private Integer awayScore;

//     @Enumerated(EnumType.STRING)
    
//     @Column(nullable = false)
//     private MatchStatus status;

//     @Lob
//     @Column(columnDefinition = "TEXT")
//     private String matchReport;

//     @ManyToMany
//     @JoinTable(
//         name = "match_scorers",
//         joinColumns = @JoinColumn(name = "match_id"),
//         inverseJoinColumns = @JoinColumn(name = "player_id")
//     )
//     private List<Player> scorers;

//     @Temporal(TemporalType.TIMESTAMP)
//     @Column(nullable = false, updatable = false)
//     private Date createdAt;

//     @Temporal(TemporalType.TIMESTAMP)
//     private Date updatedAt;

//     @PrePersist
//     protected void onCreate() {
//         createdAt = new Date();
//     }

//     @PreUpdate
//     protected void onUpdate() {
//         updatedAt = new Date();
//     }
// }


package com.sasfc.api.model;

import com.sasfc.api.model.enums.MatchStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import java.util.List;

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
    
 

    // Replaced the old "scorers" list with a more detailed "goals" list
    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Goal> goals;

    // New field for Man of the Match
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "man_of_the_match_id", nullable = true)
    private Player manOfTheMatch;
    
    // ======================================================
    // ======================================================

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

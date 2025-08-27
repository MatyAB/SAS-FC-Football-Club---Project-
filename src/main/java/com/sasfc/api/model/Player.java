// package com.sasfc.api.model;

// import com.sasfc.api.model.enums.PlayerPosition;
// import com.sasfc.api.model.enums.TeamCategory;
// import jakarta.persistence.*;

// import java.util.Date;
// import java.util.UUID;
// import lombok.Getter;
// import lombok.Setter;

// @Entity
// @Table(name = "players")
// @Getter
// @Setter
// public class Player {

//     @Id
//     @GeneratedValue(strategy = GenerationType.UUID)
//     private UUID id;

//     @Column(nullable = false)
//     private String name;

//     @Enumerated(EnumType.STRING)
//     @Column(nullable = false)
//     private PlayerPosition position;

//     private int jerseyNumber;
//     private int age;
//     private String nationality;
    
//     @Lob
//     @Column(columnDefinition = "TEXT")
//     private String bio;

//     private String imageUrl;

//     @Enumerated(EnumType.STRING)
//     @Column(nullable = false)
//     private TeamCategory teamCategory;

//     private Date joinedDate;
//     private boolean isActive = true;

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

import com.sasfc.api.model.enums.PlayerPosition;
import com.sasfc.api.model.enums.PreferredFoot; // <-- Import new enum
import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "players1")
@Getter
@Setter
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PlayerPosition position;

    private int jerseyNumber;
    private int age;
    private String nationality;
    
    @Lob
    @Column(columnDefinition = "TEXT")
    private String bio;

    private String imageUrl;


    private Date joinedDate;
    private boolean isActive = true;

    // ======================================================
    // =========== NEW FIELDS YOU REQUESTED =================
    // ======================================================

    private Double height; // In centimeters or meters
    private Double weight; // In kilograms

    @Enumerated(EnumType.STRING)
    private PreferredFoot preferredFoot;

    // These are overall career stats
    private Integer matchesPlayed;
    private Integer goalsScored;
    private Integer assists;
    private Integer cleanSheets; // Mostly for goalkeepers and defenders

    // Optional detailed stats
    private Double passAccuracy; // e.g., 85.5 for 85.5%
    private Double tackleSuccessRate; // e.g., 76.0 for 76.0%

    @Lob
    @Column(columnDefinition = "TEXT")
    private String careerHighlights;

    private String imageUrl2;
    private String imageUrl3;

    // ======================================================
    // ======================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

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

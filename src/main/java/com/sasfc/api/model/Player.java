

package com.sasfc.api.model;
import com.sasfc.api.model.enums.TeamCategory;
import com.sasfc.api.model.enums.PlayerPosition;
import com.sasfc.api.model.enums.PreferredFoot; // <-- Import new enum
import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "players")
@Getter
@Setter
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private PlayerPosition position;

    @Enumerated(EnumType.STRING)
    @Column(name = "team_category", nullable = true) 
    private TeamCategory teamCategory;

    @Column(nullable = true)
    private Integer jerseyNumber; // Changed to Integer to allow null for staff
    private int age;
    private String nationality;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String bio;

    private String imageUrl;


    private Date joinedDate;
    private boolean isActive = true;


    private Double height; // In centimeters or meters
    private Double weight; // In kilograms

    @Enumerated(EnumType.STRING)
    private PreferredFoot preferredFoot;

    // These are overall career stats
    private Integer matchesPlayed;
    private Integer goalsScored;
    private Integer assists;
    private Integer cleanSheets;
    // Optional detailed stats
    private Double passAccuracy;
    private Double tackleSuccessRate;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String careerHighlights;

    // Staff-specific fields
    private String staffId;
    private String role;
    private String specialization;
    private Integer yearsOfExperience;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String qualifications;
    private String coachingLicense;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String previousClubs;
    private Integer playersTrained;
    private Double successRate;
    private Double teamWinRate;
    private Double coachingEffectiveness;
    private Double playerDevelopment;
    private Integer expertiseLevel;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String careerAchievements;

    private String imageUrl2;
    private String imageUrl3;


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

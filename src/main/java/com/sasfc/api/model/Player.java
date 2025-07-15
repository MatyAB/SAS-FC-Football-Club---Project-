// package com.sasfc.api.model;

package com.sasfc.api.model;

import com.sasfc.api.model.enums.PlayerPosition;
import com.sasfc.api.model.enums.TeamCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "players")

public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TeamCategory teamCategory;

    private Date joinedDate;
    private boolean isActive = true;

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

package com.sasfc.api.model;

import com.sasfc.api.model.enums.SponsorCategory;
import jakarta.persistence.*;

@Entity
public class Sponsor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String slogan;
    private String logo;
    private String website;

    @Enumerated(EnumType.STRING)
    private SponsorCategory category;

    // Constructors
    public Sponsor() {
    }

    public Sponsor(String name, String description, String slogan, String logo, String website, SponsorCategory category) {
        this.name = name;
        this.description = description;
        this.slogan = slogan;
        this.logo = logo;
        this.website = website;
        this.category = category;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSlogan() {
        return slogan;
    }

    public void setSlogan(String slogan) {
        this.slogan = slogan;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public SponsorCategory getCategory() {
        return category;
    }

    public void setCategory(SponsorCategory category) {
        this.category = category;
    }
}

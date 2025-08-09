package com.sasfc.api.dto;

import com.sasfc.api.model.enums.SponsorCategory;

public class CreateSponsorRequest {
    private String name;
    private String description;
    private String slogan;
    private String logo;
    private String website;
    private SponsorCategory category;

    // Constructors
    public CreateSponsorRequest() {
    }

    public CreateSponsorRequest(String name, String description, String slogan, String logo, String website, SponsorCategory category) {
        this.name = name;
        this.description = description;
        this.slogan = slogan;
        this.logo = logo;
        this.website = website;
        this.category = category;
    }

    // Getters and Setters
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

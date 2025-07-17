package com.sasfc.api.dto;

import java.util.Date;
import java.util.UUID;

public class GalleryImageDto {
    private UUID id;
    private String url;
    private String thumbnailUrl;
    private String caption;
    private String category;
    private String uploaderName;
    private Date createdAt;
    // Getters and setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getUploaderName() { return uploaderName; }
    public void setUploaderName(String uploaderName) { this.uploaderName = uploaderName; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
} 
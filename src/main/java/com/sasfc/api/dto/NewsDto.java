// File: com.sasfc.api.dto.NewsDto.java
package com.sasfc.api.dto;

import com.sasfc.api.model.enums.NewsCategory;
import lombok.Data;
import java.util.Date;
import java.util.UUID;

@Data
public class NewsDto {
    private UUID id;
    private String title;
    private String excerpt;
    private String content;
    private String authorName;
    private NewsCategory category;
    private String imageUrl;
    private boolean isFeatured;
    private Date publishedAt;
    private Date createdAt;
}

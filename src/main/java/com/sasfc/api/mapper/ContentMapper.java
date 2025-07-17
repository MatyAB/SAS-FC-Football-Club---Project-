package com.sasfc.api.mapper;

import com.sasfc.api.dto.*;
import com.sasfc.api.model.GalleryImage;
import com.sasfc.api.model.Match;
import com.sasfc.api.model.News;
import com.sasfc.api.model.Team;

public class ContentMapper {

    // --- News ---
    public static NewsDto toNewsDto(News news) {
        NewsDto dto = new NewsDto();
        dto.setId(news.getId());
        dto.setTitle(news.getTitle());
        dto.setExcerpt(news.getExcerpt());
        dto.setContent(news.getContent());
        if (news.getAuthor() != null) {
            dto.setAuthorName(news.getAuthor().getName());
        }
        dto.setCategory(news.getCategory());
        dto.setImageUrl(news.getImageUrl());
        dto.setFeatured(news.isFeatured());
        dto.setPublishedAt(news.getPublishedAt());
        dto.setCreatedAt(news.getCreatedAt());
        return dto;
    }

    // --- Match ---
    public static MatchDto toMatchDto(Match match) {
        MatchDto dto = new MatchDto();
        dto.setId(match.getId());
        if (match.getHomeTeam() != null) {
            dto.setHomeTeam(toTeamDto(match.getHomeTeam()));
        }
        if (match.getAwayTeam() != null) {
            dto.setAwayTeam(toTeamDto(match.getAwayTeam()));
        }
        dto.setMatchDateTime(match.getMatchDateTime());
        dto.setVenue(match.getVenue());
        dto.setCompetition(match.getCompetition());
        dto.setHomeScore(match.getHomeScore());
        dto.setAwayScore(match.getAwayScore());
        dto.setStatus(match.getStatus() != null ? match.getStatus().name() : null);
        dto.setMatchReport(match.getMatchReport());
        return dto;
    }

    // --- Team ---
    public static TeamDto toTeamDto(Team team) {
        TeamDto dto = new TeamDto();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setShortName(team.getShortName());
        dto.setLogoUrl(team.getLogoUrl());
        return dto;
    }

    // --- Gallery ---
    public static GalleryImageDto toGalleryImageDto(GalleryImage image) {
        GalleryImageDto dto = new GalleryImageDto();
        dto.setId(image.getId());
        dto.setUrl(image.getUrl());
        dto.setThumbnailUrl(image.getThumbnailUrl());
        dto.setCaption(image.getCaption());
        dto.setCategory(image.getCategory() != null ? image.getCategory().name() : null);
        if (image.getUploader() != null) {
            dto.setUploaderName(image.getUploader().getName());
        }
        dto.setCreatedAt(image.getCreatedAt());
        return dto;
    }
}
package com.sasfc.api.controller;

import com.sasfc.api.dto.CreateNewsRequest;
import com.sasfc.api.dto.NewsDto;
import com.sasfc.api.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/news")
public class NewsController {
    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @PostMapping
    public ResponseEntity<NewsDto> createNews(@Valid @ModelAttribute CreateNewsRequest request,
                                              @RequestParam(value = "image", required = false) MultipartFile image) {
        NewsDto created = newsService.createNews(request, image);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsDto> getNewsById(@PathVariable UUID id) {
        NewsDto news = newsService.getNewsById(id);
        return ResponseEntity.ok(news);
    }

    @GetMapping
    public ResponseEntity<List<NewsDto>> getAllNews() {
        List<NewsDto> newsList = newsService.getAllNews();
        return ResponseEntity.ok(newsList);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<NewsDto>> getLatestNews() {
        List<NewsDto> newsList = newsService.getLatestNews(5);
        return ResponseEntity.ok(newsList);
    }

    @GetMapping("/featured")
    public ResponseEntity<List<NewsDto>> getFeaturedNews() {
        List<NewsDto> newsList = newsService.getFeaturedNews();
        return ResponseEntity.ok(newsList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsDto> updateNews(@PathVariable UUID id,
                                              @Valid @ModelAttribute CreateNewsRequest request,
                                              @RequestParam(value = "image", required = false) MultipartFile image) {
        NewsDto updated = newsService.updateNews(id, request, image);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable UUID id) {
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
} 
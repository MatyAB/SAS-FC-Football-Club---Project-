package com.sasfc.api.service;

import com.sasfc.api.dto.CreateNewsRequest;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.model.News;
import com.sasfc.api.model.NewsCategory;
import com.sasfc.api.model.User;
import com.sasfc.api.repository.NewsRepository;
import com.sasfc.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.UUID;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private UserRepository userRepository; // To set the author

    @Autowired
    private FileStorageService fileStorageService;

    public News createNews(CreateNewsRequest request, MultipartFile image) {
        // In a real app, you would get the user ID from the security context.
        // For now, we'll fetch the first admin user as a placeholder.
        User author = userRepository.findAll().stream().findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Cannot create news, no users found in system."));
            
        News news = new News();
        news.setTitle(request.getTitle());
        news.setExcerpt(request.getExcerpt());
        news.setContent(request.getContent());
        // news.setCategory(request.getCategory());
        news.setFeatured(request.isFeatured());
        news.setPublishedAt(request.getPublishedAt());
        news.setAuthor(author);
        
        if (image != null && !image.isEmpty()) {
            String fileName = fileStorageService.storeFile(image);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(fileName)
                    .toUriString();
            news.setImageUrl(fileDownloadUri);
        }

        return newsRepository.save(news);
    }

    // ... other methods for findById, findAll, update, delete etc.
}
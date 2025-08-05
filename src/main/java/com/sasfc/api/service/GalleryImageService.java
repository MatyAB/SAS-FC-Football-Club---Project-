package com.sasfc.api.service;

import com.sasfc.api.dto.GalleryImageDto;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.model.GalleryImage;
import com.sasfc.api.model.User;
import com.sasfc.api.model.enums.GalleryCategory;
import com.sasfc.api.repository.GalleryImageRepository;
import com.sasfc.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GalleryImageService {

    @Autowired
    private GalleryImageRepository galleryImageRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserRepository userRepository;

    public GalleryImageDto uploadImage(MultipartFile file, String caption, String category, Long uploaderId) {
        String fileName = fileStorageService.storeFile(file);
        String fileUrl = "/uploads/" + fileName; // Assuming a base URL for uploaded files

        GalleryImage galleryImage = new GalleryImage();
        galleryImage.setUrl(fileUrl);
        galleryImage.setThumbnailUrl(fileUrl); // For simplicity, using same URL for thumbnail
        galleryImage.setCaption(caption);
        galleryImage.setCategory(GalleryCategory.valueOf(category.toUpperCase()));

        User uploader = userRepository.findById(uploaderId)
                .orElseThrow(() -> new ResourceNotFoundException("Uploader not found with id " + uploaderId));
        galleryImage.setUploader(uploader);

        GalleryImage savedImage = galleryImageRepository.save(galleryImage);
        return convertToDto(savedImage);
    }

    public List<GalleryImageDto> uploadImages(List<MultipartFile> files, String caption, String category, Long uploaderId) {
        return files.stream()
                .map(file -> uploadImage(file, caption, category, uploaderId))
                .collect(Collectors.toList());
    }

    public List<GalleryImageDto> getAllImages() {
        return galleryImageRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public GalleryImageDto getImageById(UUID id) {
        GalleryImage galleryImage = galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("GalleryImage not found with id " + id));
        return convertToDto(galleryImage);
    }

    public GalleryImageDto updateImage(UUID id, String caption, String category) {
        GalleryImage galleryImage = galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("GalleryImage not found with id " + id));

        galleryImage.setCaption(caption);
        galleryImage.setCategory(GalleryCategory.valueOf(category.toUpperCase()));

        GalleryImage updatedImage = galleryImageRepository.save(galleryImage);
        return convertToDto(updatedImage);
    }

    public void deleteImage(UUID id) {
        GalleryImage galleryImage = galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("GalleryImage not found with id " + id));
        // Optionally, delete the file from storage as well
        // fileStorageService.deleteFile(galleryImage.getUrl());
        galleryImageRepository.delete(galleryImage);
    }

    private GalleryImageDto convertToDto(GalleryImage galleryImage) {
        GalleryImageDto dto = new GalleryImageDto();
        dto.setId(galleryImage.getId());
        dto.setUrl(galleryImage.getUrl());
        dto.setThumbnailUrl(galleryImage.getThumbnailUrl());
        dto.setCaption(galleryImage.getCaption());
        dto.setCategory(galleryImage.getCategory().name());
        dto.setUploaderName(galleryImage.getUploader() != null ? galleryImage.getUploader().getName() : "N/A");
        dto.setCreatedAt(galleryImage.getCreatedAt());
        return dto;
    }
}

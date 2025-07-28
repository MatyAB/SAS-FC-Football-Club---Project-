package com.sasfc.api.controller;

import com.sasfc.api.dto.GalleryImageDto;
import com.sasfc.api.service.GalleryImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/gallery")
public class GalleryImageController {

    @Autowired
    private GalleryImageService galleryImageService;

    @PostMapping("/upload")
    public ResponseEntity<GalleryImageDto> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("caption") String caption,
            @RequestParam("category") String category,
            @RequestParam("uploaderId") Long uploaderId) {
        GalleryImageDto uploadedImage = galleryImageService.uploadImage(file, caption, category, uploaderId);
        return new ResponseEntity<>(uploadedImage, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GalleryImageDto>> getAllImages() {
        List<GalleryImageDto> images = galleryImageService.getAllImages();
        return ResponseEntity.ok(images);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GalleryImageDto> getImageById(@PathVariable UUID id) {
        GalleryImageDto image = galleryImageService.getImageById(id);
        return ResponseEntity.ok(image);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GalleryImageDto> updateImage(
            @PathVariable UUID id,
            @RequestParam("caption") String caption,
            @RequestParam("category") String category) {
        GalleryImageDto updatedImage = galleryImageService.updateImage(id, caption, category);
        return ResponseEntity.ok(updatedImage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable UUID id) {
        galleryImageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
}

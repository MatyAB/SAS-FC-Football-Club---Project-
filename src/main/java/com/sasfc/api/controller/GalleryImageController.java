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

    @PostMapping("/upload-multiple")
    public ResponseEntity<List<GalleryImageDto>> uploadImages(
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("caption") String caption,
            @RequestParam("category") String category,
            @RequestParam(value = "uploaderId", required = false) Long uploaderId) {
        List<GalleryImageDto> uploadedImages = galleryImageService.uploadImages(files, caption, category, uploaderId);
        return new ResponseEntity<>(uploadedImages, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GalleryImageDto>> getAllImages() {
        List<GalleryImageDto> images = galleryImageService.getAllImages();
        return ResponseEntity.ok(images);
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<GalleryImageDto> getImageById(@PathVariable UUID id) {
        GalleryImageDto image = galleryImageService.getImageById(id);
        return ResponseEntity.ok(image);
    }

    @PutMapping("/images/{id}")
    public ResponseEntity<GalleryImageDto> updateImage(
            @PathVariable UUID id,
            @RequestParam("caption") String caption,
            @RequestParam("category") String category) {
        GalleryImageDto updatedImage = galleryImageService.updateImage(id, caption, category);
        return ResponseEntity.ok(updatedImage);
    }

    @PutMapping("/images/{id}/replace-file")
    public ResponseEntity<GalleryImageDto> replaceImageFile(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file) {
        GalleryImageDto updatedImage = galleryImageService.replaceImageFile(id, file);
        return ResponseEntity.ok(updatedImage);
    }

    @DeleteMapping("/images/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable UUID id) {
        galleryImageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
}

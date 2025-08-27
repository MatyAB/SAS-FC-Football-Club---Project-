package com.sasfc.api.controller;

import com.sasfc.api.dto.CreateSponsorRequest;
import com.sasfc.api.model.Sponsor;
import com.sasfc.api.model.enums.SponsorCategory;
import com.sasfc.api.service.SponsorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.io.IOException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sponsors")
public class SponsorController {

    private final SponsorService sponsorService;

    @Autowired
    public SponsorController(SponsorService sponsorService) {
        this.sponsorService = sponsorService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Sponsor> createSponsor(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String slogan,
            @RequestParam String website,
            @RequestParam SponsorCategory category,
            @RequestPart(required = false) MultipartFile logo) {
    
        CreateSponsorRequest request = new CreateSponsorRequest();
        request.setName(name);
        request.setDescription(description);
        request.setSlogan(slogan);
        request.setWebsite(website);
        request.setCategory(category);
    
        if (logo != null && !logo.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + logo.getOriginalFilename();
            Path filePath = Paths.get("uploads", fileName);
            try {
                Files.createDirectories(filePath.getParent());
                Files.copy(logo.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                request.setLogo("http://localhost:8080/uploads/" + fileName);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    
        Sponsor createdSponsor = sponsorService.createSponsor(request);
        return new ResponseEntity<>(createdSponsor, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Sponsor>> getAllSponsors() {
        List<Sponsor> sponsors = sponsorService.getAllSponsors();
        return ResponseEntity.ok(sponsors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sponsor> getSponsorById(@PathVariable Long id) {
        Optional<Sponsor> sponsor = sponsorService.getSponsorById(id);
        return sponsor.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Sponsor>> getSponsorsByCategory(@PathVariable SponsorCategory category) {
        List<Sponsor> sponsors = sponsorService.getSponsorsByCategory(category);
        return ResponseEntity.ok(sponsors);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sponsor> updateSponsor(@PathVariable Long id, @RequestBody CreateSponsorRequest request) {
        Optional<Sponsor> updatedSponsor = sponsorService.updateSponsor(id, request);
        return updatedSponsor.map(ResponseEntity::ok)
                             .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Sponsor> updateSponsorWithLogo(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String slogan,
            @RequestParam String website,
            @RequestParam SponsorCategory category,
            @RequestPart(required = false) MultipartFile logo) {
    
        CreateSponsorRequest request = new CreateSponsorRequest();
        request.setName(name);
        request.setDescription(description);
        request.setSlogan(slogan);
        request.setWebsite(website);
        request.setCategory(category);
    
        if (logo != null && !logo.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + logo.getOriginalFilename();
            Path filePath = Paths.get("uploads", fileName);
            try {
                Files.createDirectories(filePath.getParent());
                Files.copy(logo.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                request.setLogo("http://localhost:8080/uploads/" + fileName);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    
        Optional<Sponsor> updatedSponsor = sponsorService.updateSponsor(id, request);
        return updatedSponsor.map(ResponseEntity::ok)
                             .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSponsor(@PathVariable Long id) {
        sponsorService.deleteSponsor(id);
        return ResponseEntity.noContent().build();
    }
}

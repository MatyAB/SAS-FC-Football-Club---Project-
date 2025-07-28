package com.sasfc.api.repository;

import com.sasfc.api.model.GalleryImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface GalleryImageRepository extends JpaRepository<GalleryImage, UUID> {
}

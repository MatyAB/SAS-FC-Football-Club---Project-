package com.sasfc.api.repository;

import com.sasfc.api.model.Sponsor;
import com.sasfc.api.model.enums.SponsorCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SponsorRepository extends JpaRepository<Sponsor, Long> {
    List<Sponsor> findByCategory(SponsorCategory category);
}

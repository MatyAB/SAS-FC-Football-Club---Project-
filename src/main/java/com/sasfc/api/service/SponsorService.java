package com.sasfc.api.service;

import com.sasfc.api.dto.CreateSponsorRequest;
import com.sasfc.api.model.Sponsor;
import com.sasfc.api.model.enums.SponsorCategory;
import com.sasfc.api.repository.SponsorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SponsorService {

    private final SponsorRepository sponsorRepository;

    @Autowired
    public SponsorService(SponsorRepository sponsorRepository) {
        this.sponsorRepository = sponsorRepository;
    }

    public Sponsor createSponsor(CreateSponsorRequest request) {
        Sponsor sponsor = new Sponsor();
        sponsor.setName(request.getName());
        sponsor.setDescription(request.getDescription());
        sponsor.setSlogan(request.getSlogan());
        sponsor.setLogo(request.getLogo());
        sponsor.setWebsite(request.getWebsite());
        sponsor.setCategory(request.getCategory());
        return sponsorRepository.save(sponsor);
    }

    public List<Sponsor> getAllSponsors() {
        return sponsorRepository.findAll();
    }

    public Optional<Sponsor> getSponsorById(Long id) {
        return sponsorRepository.findById(id);
    }

    public List<Sponsor> getSponsorsByCategory(SponsorCategory category) {
        return sponsorRepository.findByCategory(category);
    }

    public Optional<Sponsor> updateSponsor(Long id, CreateSponsorRequest request) {
        return sponsorRepository.findById(id).map(sponsor -> {
            sponsor.setName(request.getName());
            sponsor.setDescription(request.getDescription());
            sponsor.setSlogan(request.getSlogan());
            sponsor.setLogo(request.getLogo());
            sponsor.setWebsite(request.getWebsite());
            sponsor.setCategory(request.getCategory());
            return sponsorRepository.save(sponsor);
        });
    }

    public void deleteSponsor(Long id) {
        sponsorRepository.deleteById(id);
    }
}

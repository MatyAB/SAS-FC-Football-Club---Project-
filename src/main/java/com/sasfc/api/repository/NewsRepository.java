package com.sasfc.api.repository;

import com.sasfc.api.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findTop5ByOrderByPublishedAtDesc();
    List<News> findByIsFeaturedTrueOrderByPublishedAtDesc();
}

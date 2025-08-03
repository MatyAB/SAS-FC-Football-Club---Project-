package com.sasfc.api.service;

import com.sasfc.api.dto.CategoryDto;
import com.sasfc.api.exception.DuplicateResourceException;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.mapper.CategoryMapper;
import com.sasfc.api.model.Category;
import com.sasfc.api.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    public CategoryDto createCategory(CategoryDto categoryDto) {
        if (categoryRepository.findByCategoryName(categoryDto.getCategoryName()).isPresent()) {
            throw new DuplicateResourceException("Category with name " + categoryDto.getCategoryName() + " already exists");
        }
        Category category = categoryMapper.dtoToModel(categoryDto);
        return categoryMapper.modelToDto(categoryRepository.save(category));
    }

    public List<CategoryDto> listCategories() {
        return categoryRepository.findAll().stream().map(categoryMapper::modelToDto).collect(Collectors.toList());
    }

    public CategoryDto getCategoryById(int categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category with id " + categoryId + " not found"));
        return categoryMapper.modelToDto(category);
    }

    public CategoryDto updateCategory(int categoryId, CategoryDto categoryDto) {
        Category existingCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category with id " + categoryId + " not found"));
        if (categoryRepository.findByCategoryName(categoryDto.getCategoryName()).isPresent() && !existingCategory.getCategoryName().equals(categoryDto.getCategoryName())) {
            throw new DuplicateResourceException("Category with name " + categoryDto.getCategoryName() + " already exists");
        }
        existingCategory.setCategoryName(categoryDto.getCategoryName());
        existingCategory.setDescription(categoryDto.getDescription());
        return categoryMapper.modelToDto(categoryRepository.save(existingCategory));
    }

    public void deleteCategory(int categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category with id " + categoryId + " not found"));
        categoryRepository.delete(category);
    }
}

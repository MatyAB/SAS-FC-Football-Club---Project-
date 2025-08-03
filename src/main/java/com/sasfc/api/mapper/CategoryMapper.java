package com.sasfc.api.mapper;

import com.sasfc.api.model.Category;
import com.sasfc.api.dto.CategoryDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryDto modelToDto(Category category);

    Category dtoToModel(CategoryDto categoryDto);
}

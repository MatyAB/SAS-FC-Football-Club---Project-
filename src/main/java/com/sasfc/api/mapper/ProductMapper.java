package com.sasfc.api.mapper;

import com.sasfc.api.dto.ProductDto;
import com.sasfc.api.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "category.categoryId", target = "categoryId")
    @Mapping(source = "category.categoryName", target = "categoryName")
    @Mapping(source = "vendor.id", target = "vendorId")
    @Mapping(source = "vendor.name", target = "vendorName")
    ProductDto toDto(Product product);

    @Mapping(source = "categoryId", target = "category.categoryId")
    @Mapping(source = "vendorId", target = "vendor.id")
    Product toEntity(ProductDto productDto);
}

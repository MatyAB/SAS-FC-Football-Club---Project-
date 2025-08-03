package com.sasfc.api.dto;

import com.sasfc.api.model.enums.ProductStatus;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {

    private Integer productId;
    private Integer categoryId;
    private String categoryName;
    private Integer vendorId;
    private String vendorName;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal purchasePrice;
    private BigDecimal rentalPrice;
    private ProductStatus status;
}

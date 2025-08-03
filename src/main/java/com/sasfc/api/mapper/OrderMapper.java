package com.sasfc.api.mapper;

import com.sasfc.api.dto.OrderDto;
import com.sasfc.api.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "product.productId", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    OrderDto toDto(Order order);

    @Mapping(source = "customerId", target = "customer.id")
    @Mapping(source = "productId", target = "product.productId")
    Order toEntity(OrderDto orderDto);
}

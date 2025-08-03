package com.sasfc.api.mapper;

import com.sasfc.api.dto.CustomOrderDto;
import com.sasfc.api.model.CustomOrder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface CustomOrderMapper {

    CustomOrderMapper INSTANCE = Mappers.getMapper(CustomOrderMapper.class);

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "assignedVendor.id", target = "assignedVendorId")
    @Mapping(source = "assignedVendor.name", target = "assignedVendorName")
    CustomOrderDto toDto(CustomOrder customOrder);

    @Mapping(source = "customerId", target = "customer.id")
    @Mapping(source = "assignedVendorId", target = "assignedVendor.id")
    CustomOrder toEntity(CustomOrderDto customOrderDto);
}

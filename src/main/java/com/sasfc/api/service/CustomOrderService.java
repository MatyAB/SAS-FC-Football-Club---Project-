package com.sasfc.api.service;

import com.sasfc.api.dto.CustomOrderDto;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.mapper.CustomOrderMapper;
import com.sasfc.api.model.CustomOrder;
import com.sasfc.api.repository.CustomOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomOrderService {

    private final CustomOrderRepository customOrderRepository;
    private final CustomOrderMapper customOrderMapper;

    @Autowired
    public CustomOrderService(CustomOrderRepository customOrderRepository, CustomOrderMapper customOrderMapper) {
        this.customOrderRepository = customOrderRepository;
        this.customOrderMapper = customOrderMapper;
    }

    @Transactional(readOnly = true)
    public List<CustomOrderDto> getAllCustomOrders() {
        return customOrderRepository.findAll().stream()
                .map(customOrderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CustomOrderDto getCustomOrderById(Integer customOrderId) {
        return customOrderRepository.findById(customOrderId)
                .map(customOrderMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("CustomOrder not found with id: " + customOrderId));
    }

    @Transactional
    public CustomOrderDto createCustomOrder(CustomOrderDto customOrderDto) {
        CustomOrder customOrder = customOrderMapper.toEntity(customOrderDto);
        CustomOrder savedCustomOrder = customOrderRepository.save(customOrder);
        return customOrderMapper.toDto(savedCustomOrder);
    }

    @Transactional
    public CustomOrderDto updateCustomOrder(Integer customOrderId, CustomOrderDto customOrderDto) {
        CustomOrder existingCustomOrder = customOrderRepository.findById(customOrderId)
                .orElseThrow(() -> new ResourceNotFoundException("CustomOrder not found with id: " + customOrderId));

        existingCustomOrder.setRequestDetails(customOrderDto.getRequestDetails());
        existingCustomOrder.setStatus(customOrderDto.getStatus());
        existingCustomOrder.setQuotedPrice(customOrderDto.getQuotedPrice());

        CustomOrder updatedCustomOrder = customOrderRepository.save(existingCustomOrder);
        return customOrderMapper.toDto(updatedCustomOrder);
    }

    @Transactional
    public void deleteCustomOrder(Integer customOrderId) {
        if (!customOrderRepository.existsById(customOrderId)) {
            throw new ResourceNotFoundException("CustomOrder not found with id: " + customOrderId);
        }
        customOrderRepository.deleteById(customOrderId);
    }
}

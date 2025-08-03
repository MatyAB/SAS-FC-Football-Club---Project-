package com.sasfc.api.service;

import com.sasfc.api.dto.OrderDto;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.mapper.OrderMapper;
import com.sasfc.api.model.Order;
import com.sasfc.api.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    @Transactional(readOnly = true)
    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderDto getOrderById(Integer orderId) {
        return orderRepository.findById(orderId)
                .map(orderMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
    }

    @Transactional
    public OrderDto createOrder(OrderDto orderDto) {
        Order order = orderMapper.toEntity(orderDto);
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDto(savedOrder);
    }

    @Transactional
    public OrderDto updateOrder(Integer orderId, OrderDto orderDto) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        existingOrder.setOrderType(orderDto.getOrderType());
        existingOrder.setTotalAmount(orderDto.getTotalAmount());
        existingOrder.setRentalStartDate(orderDto.getRentalStartDate());
        existingOrder.setRentalEndDate(orderDto.getRentalEndDate());
        existingOrder.setStatus(orderDto.getStatus());

        Order updatedOrder = orderRepository.save(existingOrder);
        return orderMapper.toDto(updatedOrder);
    }

    @Transactional
    public void deleteOrder(Integer orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new ResourceNotFoundException("Order not found with id: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }
}

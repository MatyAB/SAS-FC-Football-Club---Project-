package com.sasfc.api.controller;

import com.sasfc.api.dto.CustomOrderDto;
import com.sasfc.api.service.CustomOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/custom-orders")
public class CustomOrderController {

    private final CustomOrderService customOrderService;

    @Autowired
    public CustomOrderController(CustomOrderService customOrderService) {
        this.customOrderService = customOrderService;
    }

    @GetMapping
    public ResponseEntity<List<CustomOrderDto>> getAllCustomOrders() {
        return ResponseEntity.ok(customOrderService.getAllCustomOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomOrderDto> getCustomOrderById(@PathVariable Integer id) {
        return ResponseEntity.ok(customOrderService.getCustomOrderById(id));
    }

    @PostMapping
    public ResponseEntity<CustomOrderDto> createCustomOrder(@RequestBody CustomOrderDto customOrderDto) {
        CustomOrderDto createdCustomOrder = customOrderService.createCustomOrder(customOrderDto);
        return new ResponseEntity<>(createdCustomOrder, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomOrderDto> updateCustomOrder(@PathVariable Integer id, @RequestBody CustomOrderDto customOrderDto) {
        return ResponseEntity.ok(customOrderService.updateCustomOrder(id, customOrderDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomOrder(@PathVariable Integer id) {
        customOrderService.deleteCustomOrder(id);
        return ResponseEntity.noContent().build();
    }
}

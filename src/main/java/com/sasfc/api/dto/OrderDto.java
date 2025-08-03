package com.sasfc.api.dto;

import com.sasfc.api.model.enums.OrderStatus;
import com.sasfc.api.model.enums.OrderType;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class OrderDto {
    private Integer orderId;
    private Integer customerId;
    private String customerName;
    private Integer productId;
    private String productName;
    private OrderType orderType;
    private BigDecimal totalAmount;
    private Date orderDate;
    private Date rentalStartDate;
    private Date rentalEndDate;
    private OrderStatus status;
}

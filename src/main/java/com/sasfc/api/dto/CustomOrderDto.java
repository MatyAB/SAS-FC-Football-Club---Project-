package com.sasfc.api.dto;

import com.sasfc.api.model.enums.CustomOrderStatus;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class CustomOrderDto {
    private Integer customOrderId;
    private Integer customerId;
    private String customerName;
    private Integer assignedVendorId;
    private String assignedVendorName;
    private String requestDetails;
    private CustomOrderStatus status;
    private BigDecimal quotedPrice;
}

package com.sasfc.api.model;

import com.sasfc.api.model.enums.CustomOrderStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Table(name = "custom_orders")
@Getter
@Setter
public class CustomOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customOrderId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "assigned_vendor_id")
    private User assignedVendor;

    @Column(columnDefinition = "TEXT")
    private String requestDetails;

    @Enumerated(EnumType.STRING)
    private CustomOrderStatus status;

    @Column(precision = 10, scale = 2)
    private BigDecimal quotedPrice;
}

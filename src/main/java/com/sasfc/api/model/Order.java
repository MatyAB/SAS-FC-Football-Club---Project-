package com.sasfc.api.model;

import com.sasfc.api.model.enums.OrderStatus;
import com.sasfc.api.model.enums.OrderType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date orderDate;

    @Temporal(TemporalType.DATE)
    private Date rentalStartDate;

    @Temporal(TemporalType.DATE)
    private Date rentalEndDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @PrePersist
    protected void onCreate() {
        orderDate = new Date();
    }
}

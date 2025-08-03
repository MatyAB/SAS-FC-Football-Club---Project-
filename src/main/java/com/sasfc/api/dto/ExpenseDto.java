package com.sasfc.api.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class ExpenseDto {
    private Integer expenseId;
    private String description;
    private BigDecimal amount;
    private Date date;
}

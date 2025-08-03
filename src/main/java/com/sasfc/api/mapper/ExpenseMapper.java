package com.sasfc.api.mapper;

import com.sasfc.api.dto.ExpenseDto;
import com.sasfc.api.model.Expense;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    ExpenseMapper INSTANCE = Mappers.getMapper(ExpenseMapper.class);

    ExpenseDto toDto(Expense expense);

    Expense toEntity(ExpenseDto expenseDto);
}

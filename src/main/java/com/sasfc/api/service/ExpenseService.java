package com.sasfc.api.service;

import com.sasfc.api.dto.ExpenseDto;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.mapper.ExpenseMapper;
import com.sasfc.api.model.Expense;
import com.sasfc.api.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository, ExpenseMapper expenseMapper) {
        this.expenseRepository = expenseRepository;
        this.expenseMapper = expenseMapper;
    }

    @Transactional(readOnly = true)
    public List<ExpenseDto> getAllExpenses() {
        return expenseRepository.findAll().stream()
                .map(expenseMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ExpenseDto getExpenseById(Integer expenseId) {
        return expenseRepository.findById(expenseId)
                .map(expenseMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + expenseId));
    }

    @Transactional
    public ExpenseDto createExpense(ExpenseDto expenseDto) {
        Expense expense = expenseMapper.toEntity(expenseDto);
        Expense savedExpense = expenseRepository.save(expense);
        return expenseMapper.toDto(savedExpense);
    }

    @Transactional
    public ExpenseDto updateExpense(Integer expenseId, ExpenseDto expenseDto) {
        Expense existingExpense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + expenseId));

        existingExpense.setDescription(expenseDto.getDescription());
        existingExpense.setAmount(expenseDto.getAmount());
        existingExpense.setDate(expenseDto.getDate());

        Expense updatedExpense = expenseRepository.save(existingExpense);
        return expenseMapper.toDto(updatedExpense);
    }

    @Transactional
    public void deleteExpense(Integer expenseId) {
        if (!expenseRepository.existsById(expenseId)) {
            throw new ResourceNotFoundException("Expense not found with id: " + expenseId);
        }
        expenseRepository.deleteById(expenseId);
    }
}

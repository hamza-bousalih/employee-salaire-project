package com.example.employee.ws.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DetailSalaireDto {
    private Long id;
    private String code;
    private EmployeDto employee;
    private LocalDate month;
    private double salaireBase;
    private double primeGeneral;
    private ResponsibilityDto responsibility;
    private double responsibilityPrime;
}

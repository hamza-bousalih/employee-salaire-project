package com.example.employee.ws.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MandatDto {
    private Long id;
    private String code;
    private ResponsibilityDto responsibility;
    private EmployeDto employee;
    private double prime;
    private LocalDate startDate;
    private LocalDate endDate;
}

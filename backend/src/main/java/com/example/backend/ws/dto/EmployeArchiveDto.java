package com.example.employee.ws.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeArchiveDto {
    private Long id;
    private String code;
    private String cin;
    private String nom;
    private String prenom;
    private String deleteRaison;
    private LocalDate deleteDate;
}

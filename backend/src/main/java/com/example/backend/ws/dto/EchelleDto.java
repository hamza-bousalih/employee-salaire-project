package com.example.employee.ws.dto;


import lombok.Data;

@Data
public class EchelleDto {
    private Long id;
    private String libelle;
    private String code;
    private GradeDto grade;
}

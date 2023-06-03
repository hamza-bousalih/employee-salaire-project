package com.example.employee.ws.dto;


import lombok.Data;

@Data
public class EntiteAdministratifDto {
    private Long id;
    private String code;
    private String libelle;
    private int membersNum = 0;
    private EmployeDto chef;
}

package com.example.employee.ws.dto;

import lombok.Data;

@Data
public class EmployeDto {
    private Long id;
    private String cin;
    private String nom;
    private String prenom;
    private int numMois = 0;
    private String email;
    private String phone;
    private double salaireBase;
    private EchelonDto echelon;
    private EntiteAdministratifDto entiteAdministratif;
}

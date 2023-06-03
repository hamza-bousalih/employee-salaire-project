package com.example.employee.ws.dto;

import lombok.Data;

@Data
public class EchelonDto {
    private Long id;
    private String code;
    private String libelle;
    private int delai;
    private double prime = 0;
    private EchelleDto echelle;
    private EchelonDto echelonSuiv;
    private EchelonDto echelonPrec;
}

package com.example.employee.ws.dto;

import lombok.Data;


@Data
public class ResponsibilityDto {
    private Long id;
    private String code;
    private String libelle;
    private EchelonDto echelon;
    private double prime = 0;
}

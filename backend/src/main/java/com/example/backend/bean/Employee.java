package com.example.employee.bean;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee-sequence")
    @SequenceGenerator(
            name = "employee-sequence",
            allocationSize = 1,
            sequenceName = "employee-sequence"
    )
    private Long id;
    private String cin;
    private String nom;
    private String prenom;
    private String email;
    private String phone;
    private double salaireBase;
    private int numMois = 0;
    @ManyToOne
    private Echelon echelon;
    @ManyToOne
    private EntiteAdministratif entiteAdministratif;
}

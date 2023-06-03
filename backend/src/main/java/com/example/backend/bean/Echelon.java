package com.example.employee.bean;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Echelon {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "echellon-sequence")
    @SequenceGenerator(
            name = "echellon-sequence",
            allocationSize = 1,
            sequenceName = "echellon-sequence"
    )
    private Long id;
    private String code;
    private String libelle;
    private int delai = 0;
    private double prime = 0;
    @ManyToOne
    private Echelle echelle;
    @OneToOne
    private Echelon echelonSuiv;
    @OneToOne
    private Echelon echelonPrec;
}

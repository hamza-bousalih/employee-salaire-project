package com.example.employee.bean;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Echelle {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "echelle-sequence")
    @SequenceGenerator(
            name = "echelle-sequence",
            allocationSize = 1,
            sequenceName = "echelle-sequence"
    )
    private Long id;
    private String libelle;
    private String code;
    @ManyToOne
    private Grade grade;
}

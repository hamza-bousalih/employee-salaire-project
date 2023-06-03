package com.example.employee.bean;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Responsibility {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee-sequence")
    @SequenceGenerator(
            name = "employee-sequence",
            allocationSize = 1,
            sequenceName = "employee-sequence"
    )
    @Column(nullable = false, updatable = false, unique = true)
    private Long id;
    @Column(nullable = false, updatable = false, unique = true)
    private String code;
    private String libelle;
    @ManyToOne
    private Echelon echelon;
    private double prime = 0;
}

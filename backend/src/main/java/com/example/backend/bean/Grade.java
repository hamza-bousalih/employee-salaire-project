package com.example.employee.bean;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "grad-sequence")
    @SequenceGenerator(
            name = "grad-sequence",
            allocationSize = 1,
            sequenceName = "grad-sequence"
    )
    private Long id;
    private String code;
    private String libelle;
}

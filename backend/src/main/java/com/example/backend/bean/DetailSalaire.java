package com.example.employee.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class DetailSalaire {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DetailSalaire-sequence")
    @SequenceGenerator(
            name = "DetailSalaire-sequence",
            allocationSize = 1,
            sequenceName = "DetailSalaire-sequence"
    )
    private Long id;
    private String code;
    @ManyToOne
    private Employee employee;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate month;
    private double salaireBase;
    private double primeGeneral;
    @ManyToOne
    private Responsibility responsibility;
    private double responsibilityPrime = 0;
}

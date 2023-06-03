package com.example.employee.bean;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Mandat {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee-sequence")
    @SequenceGenerator(
            name = "employee-sequence",
            allocationSize = 1,
            sequenceName = "employee-sequence"
    )
    @Column(nullable = false, updatable = false, unique = true)
    private Long id;
    private String code;
    @ManyToOne
    private Responsibility responsibility;
    @ManyToOne
    private Employee employee;
    private double prime;
    private LocalDate startDate;
    private LocalDate endDate;
}

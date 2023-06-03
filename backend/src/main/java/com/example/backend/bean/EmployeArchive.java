package com.example.employee.bean;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class EmployeArchive {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employeArchive-sequence")
    @SequenceGenerator(
            name = "employeArchive-sequence",
            allocationSize = 1,
            sequenceName = "employeArchive-sequence"
    )
    private Long id;
    private String code;
    private String cin;
    private String nom;
    private String prenom;
    private String deleteRaison;
    private LocalDate deleteDate = LocalDate.now();
}

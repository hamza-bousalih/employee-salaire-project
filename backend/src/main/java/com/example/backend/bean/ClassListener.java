package com.example.employee.bean;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class ClassListener {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "classListener-sequence")
    @SequenceGenerator(
            name = "classListener-sequence",
            allocationSize = 1,
            sequenceName = "classListener-sequence"
    )
    private Long id;
    private String action;
    private String tableName;
    private LocalDate actionDate;
}

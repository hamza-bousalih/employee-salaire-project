package com.example.employee.bean;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class EntiteAdministratif {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "entitieAdmin-sequence")
    @SequenceGenerator(
            name = "entitieAdmin-sequence",
            allocationSize = 1,
            sequenceName = "entitieAdmin-sequence"
    )
    private Long id;
    private String code;
    private String libelle;
    private int membersNum = 0;
    @OneToOne
    private Employee chef;
}

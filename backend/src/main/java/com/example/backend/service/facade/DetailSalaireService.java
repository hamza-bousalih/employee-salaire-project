package com.example.employee.service.facade;

import com.example.employee.bean.DetailSalaire;

import java.time.LocalDate;
import java.util.List;

public interface DetailSalaireService {
    DetailSalaire findByCode(String code);

    int deleteByCode(String code);

    List<DetailSalaire> findByEmployeeCin(String cin);

    List<DetailSalaire> findByMonth(LocalDate month);

    int deleteByEmployeeCin(String cin);

    boolean existsByEmployeeCinAndMonth(String cin, LocalDate mois);

    DetailSalaire findByEmployeeCinAndMonth(String cin, LocalDate mois);

    List<DetailSalaire> findAll();

    void save(DetailSalaire detailSalaire);
}

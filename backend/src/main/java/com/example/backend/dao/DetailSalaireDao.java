package com.example.employee.dao;

import com.example.employee.bean.DetailSalaire;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DetailSalaireDao  extends JpaRepository<DetailSalaire,Long> {
    DetailSalaire findByCode(String code);
    int deleteByCode(String code);
    List<DetailSalaire> findByEmployeeCin(String cin, Sort sort);
    List<DetailSalaire> findByMonth(LocalDate month);
    int deleteByEmployeeCin(String cin);
    boolean existsByEmployeeCinAndMonth(String cin, LocalDate month);
    DetailSalaire findByEmployeeCinAndMonth(String cin, LocalDate month);
}

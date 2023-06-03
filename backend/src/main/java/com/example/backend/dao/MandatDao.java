package com.example.employee.dao;

import com.example.employee.bean.Mandat;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MandatDao  extends JpaRepository<Mandat,Long> {
    Mandat findByCode(String code);
    int deleteByCode(String code);
    boolean existsByCode(String code);
    List<Mandat> findByEmployeeCin(String cin, Sort sort);
    int deleteByEmployeeCin(String cin);
    List<Mandat> findByResponsibilityCode(String code);
    List<Mandat> findByResponsibilityCodeAndEndDateGreaterThanEqual(String code, LocalDate localDate);
    Mandat findByEmployeeCinAndEndDateBetween(String code, LocalDate minDate, LocalDate maxDate);
    Mandat findByEmployeeCinAndStartDateLessThanAndEndDateGreaterThan(
            String cin, LocalDate monthEnd, LocalDate monthStart);
    int deleteByResponsibilityCode(String code);
    boolean existsByEmployeeCinAndEndDateGreaterThanEqual(String cin,LocalDate date);
}

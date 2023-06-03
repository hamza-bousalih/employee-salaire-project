package com.example.employee.service.facade;

import com.example.employee.bean.Mandat;

import java.time.LocalDate;
import java.util.List;

public interface MandatService {
    Mandat findByCode(String code);

    int deleteByCode(String code);

    boolean existsByCode(String code);

    List<Mandat> findByEmployeeCin(String cin);

    int deleteByEmployeeCin(String cin);

    List<Mandat> findByResponsibilityCode(String code);

    int deleteByResponsibilityCode(String code);

    List<Mandat> findMandatByRespCodeAndEndDate(String code, LocalDate localDate);

    Mandat findByEmployeeCinAndStartDateLessThanAndEndDateGreaterThan(String cin, LocalDate monthEnd, LocalDate monthStart);

    List<Mandat> findAll();

    void create(Mandat mandat);

    void update(Mandat mandat);

    int updatePrime(Long id, double prime);

    boolean isEmployeeHaveResp(String cin, LocalDate date);
}

package com.example.employee.service.impl;

import com.example.employee.bean.Mandat;
import com.example.employee.dao.MandatDao;
import com.example.employee.service.facade.MandatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MandatServiceImpl implements MandatService {
    private final MandatDao mandatDao;

    @Override
    public Mandat findByCode(String code) {
        return mandatDao.findByCode(code);
    }

    @Override
    public int deleteByCode(String code) {
        return mandatDao.deleteByCode(code);
    }

    @Override
    public boolean existsByCode(String code) {
        return mandatDao.existsByCode(code);
    }

    @Override
    public List<Mandat> findByEmployeeCin(String cin) {
        return mandatDao.findByEmployeeCin(cin, Sort.by(Sort.Direction.DESC, "startDate"));
    }

    @Override
    public int deleteByEmployeeCin(String cin) {
        return mandatDao.deleteByEmployeeCin(cin);
    }

    @Override
    public List<Mandat> findByResponsibilityCode(String code) {
        return mandatDao.findByResponsibilityCode(code);
    }

    @Override
    public int deleteByResponsibilityCode(String code) {
        return mandatDao.deleteByResponsibilityCode(code);
    }

    @Override
    public List<Mandat> findMandatByRespCodeAndEndDate(String code, LocalDate localDate) {
        return mandatDao.findByResponsibilityCodeAndEndDateGreaterThanEqual(code, localDate);
    }

    @Override
    public Mandat findByEmployeeCinAndStartDateLessThanAndEndDateGreaterThan(String cin, LocalDate monthEnd, LocalDate monthStart) {
        return mandatDao.findByEmployeeCinAndStartDateLessThanAndEndDateGreaterThan(cin, monthEnd, monthStart);
    }

    @Override
    public List<Mandat> findAll() {
        return mandatDao.findAll();
    }

    @Override
    public void create(Mandat mandat) {
        mandatDao.save(mandat);
    }

    @Override
    public void update(Mandat mandat) {
        mandatDao.save(mandat);
    }

    @Override
    public int updatePrime(Long id, double prime) {
        Mandat mandat = mandatDao.findById(id).orElse(null);
        if (mandat == null) return -1;
        mandat.setPrime(prime);
        mandatDao.save(mandat);
        return 1;
    }

    @Override
    public boolean isEmployeeHaveResp(String cin, LocalDate date) {
        return mandatDao.existsByEmployeeCinAndEndDateGreaterThanEqual(cin, date);
    }
}

package com.example.employee.service.impl;

import com.example.employee.bean.DetailSalaire;
import com.example.employee.dao.DetailSalaireDao;
import com.example.employee.service.facade.DetailSalaireService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DetailSalaireServiceImpl implements DetailSalaireService {
    @Override
    public DetailSalaire findByCode(String code) {
        return detailSalaireDao.findByCode(code);
    }

    @Override
    public int deleteByCode(String code) {
        return detailSalaireDao.deleteByCode(code);
    }

    @Override
    public List<DetailSalaire> findByEmployeeCin(String cin) {
        return detailSalaireDao.findByEmployeeCin(cin, Sort.by(Sort.Direction.DESC, "month"));
    }

    @Override
    public List<DetailSalaire> findByMonth(LocalDate month) {
        // get the last day of the given month
        LocalDate endOfMonth = month.withDayOfMonth(
                month.getMonth().length(month.isLeapYear()));
        return detailSalaireDao.findByMonth(endOfMonth);
    }

    @Override
    public int deleteByEmployeeCin(String cin) {
        return detailSalaireDao.deleteByEmployeeCin(cin);
    }

    @Override
    public boolean existsByEmployeeCinAndMonth(String cin, LocalDate mois) {
        return detailSalaireDao.existsByEmployeeCinAndMonth(cin, mois);
    }

    @Override
    public DetailSalaire findByEmployeeCinAndMonth(String cin, LocalDate mois) {
        return detailSalaireDao.findByEmployeeCinAndMonth(cin, mois);
    }

    @Override
    public List<DetailSalaire> findAll() {
        return detailSalaireDao.findAll();
    }

    @Override
    public void save(DetailSalaire detailSalaire) {
        detailSalaireDao.save(detailSalaire);
    }

    private final DetailSalaireDao detailSalaireDao;
}

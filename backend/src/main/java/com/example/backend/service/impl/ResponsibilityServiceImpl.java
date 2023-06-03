package com.example.employee.service.impl;

import com.example.employee.bean.Responsibility;
import com.example.employee.dao.MandatDao;
import com.example.employee.dao.ResponsibilityDao;
import com.example.employee.service.facade.ResponsibilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResponsibilityServiceImpl implements ResponsibilityService {
    private final ResponsibilityDao responsibilityDao;
    private final MandatDao mandatDao;

    @Override
    public Responsibility findByCode(String code) {
        return responsibilityDao.findByCode(code);
    }

    @Override
    public int deleteByCode(String code) {
        int mandatDeleted = mandatDao.deleteByResponsibilityCode(code);
        int respDeleted = responsibilityDao.deleteByCode(code);
        return respDeleted + mandatDeleted;
    }

    @Override
    public boolean existsByCode(String code) {
        return responsibilityDao.existsByCode(code);
    }

    @Override
    public List<Responsibility> findAll() {
        return responsibilityDao.findAll();
    }

    @Override
    public void update(Responsibility responsibility) {
        responsibilityDao.save(responsibility);
    }

    @Override
    public void create(Responsibility responsibility) {
        responsibilityDao.save(responsibility);
    }
}

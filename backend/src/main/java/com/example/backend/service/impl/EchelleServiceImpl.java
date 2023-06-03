package com.example.employee.service.impl;

import com.example.employee.bean.Echelle;
import com.example.employee.dao.EchelleDao;
import com.example.employee.service.facade.EchelleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EchelleServiceImpl implements EchelleService {
    private final EchelleDao echelleDao;

    @Override
    public Echelle findByCode(String code) {
        return echelleDao.findByCode(code);
    }

    @Override
    public int deleteByCode(String code) {
        return echelleDao.deleteByCode(code);
    }

    @Override
    public List<Echelle> findAll() {
        return echelleDao.findAll();
    }

    @Override
    public List<Echelle> findByGradeCode(String code) {
        return echelleDao.findByGradeCode(code);
    }

    @Override
    public void create(Echelle echelle) {
        echelleDao.save(echelle);
    }

    @Override
    public void edit(Echelle echelle) {
        echelleDao.save(echelle);
    }

    @Override
    public boolean existsByCode(String code) {
        return echelleDao.existsByCode(code);
    }
}

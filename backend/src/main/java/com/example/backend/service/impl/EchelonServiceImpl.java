package com.example.employee.service.impl;

import com.example.employee.bean.Echelon;
import com.example.employee.dao.EchelonDao;
import com.example.employee.service.facade.EchelonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EchelonServiceImpl implements EchelonService {
    private final EchelonDao echelonDao;

    @Override
    public Echelon findByCode(String code) {
        return echelonDao.findByCode(code);
    }

    @Override
    public int deleteByCode(String code) {
        return echelonDao.deleteByCode(code);
    }

    @Override
    public List<Echelon> findAll() {
        return echelonDao.findAll();
    }

    @Override
    public boolean existsByCode(String code) {
        return echelonDao.existsByCode(code);
    }

    @Override
    public List<Echelon> findByEchelleCode(String code) {
        return echelonDao.findByEchelleCode(code);
    }

    @Override
    public void create(Echelon echelon) {
        echelonDao.save(echelon);
    }
    @Override
    public void update(Echelon echelon) {
        echelonDao.save(echelon);
    }
}

package com.example.employee.service.facade;

import com.example.employee.bean.Echelle;

import java.util.List;

public interface EchelleService {
    Echelle findByCode(String code);

    int deleteByCode(String code);

    List<Echelle> findAll();

    List<Echelle> findByGradeCode(String code);

    void create(Echelle echelle);

    void edit(Echelle echelle);

    boolean existsByCode(String code);
}

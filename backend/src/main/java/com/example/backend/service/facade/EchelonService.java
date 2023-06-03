package com.example.employee.service.facade;

import com.example.employee.bean.Echelon;

import java.util.List;

public interface EchelonService {
    Echelon findByCode(String code);

    int deleteByCode(String code);

    List<Echelon> findAll();

    boolean existsByCode(String code);

    List<Echelon> findByEchelleCode(String code);

    void create(Echelon newEchelon);

    void update(Echelon echelon);
}

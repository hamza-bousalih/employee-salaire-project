package com.example.employee.service.facade;

import com.example.employee.bean.Responsibility;

import java.util.List;

public interface ResponsibilityService {
    Responsibility findByCode(String code);

    int deleteByCode(String code);

    boolean existsByCode(String code);

    List<Responsibility> findAll();

    void update(Responsibility responsibility);

    void create(Responsibility responsibility);
}

package com.example.employee.service.facade;

import com.example.employee.bean.Grade;

import java.util.List;

public interface GradeService {
    Grade findByCode(String code);

    int deleteByCode(String code);

    List<Grade> findAll();

    void create(Grade grade);

    void edit(Grade grade);

    boolean existsByCode(String code);
}

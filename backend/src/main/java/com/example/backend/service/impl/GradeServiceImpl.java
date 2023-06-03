package com.example.employee.service.impl;

import com.example.employee.bean.Grade;
import com.example.employee.dao.GradeDao;
import com.example.employee.service.facade.GradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GradeServiceImpl implements GradeService {
    private final GradeDao gradeDao;

    @Override
    public Grade findByCode(String code) {
        return gradeDao.findByCode(code);
    }

    @Override
    public List<Grade> findAll() {
        return gradeDao.findAll();
    }



    @Override
    public void create(Grade grade) {
        gradeDao.save(grade);
    }

    @Override
    public void edit(Grade newGrade) {
        gradeDao.save(newGrade);
    }

    @Override
    public int deleteByCode(String code) {
        return gradeDao.deleteByCode(code);
    }

    @Override
    public boolean existsByCode(String code) {
        return gradeDao.existsByCode(code);
    }
}

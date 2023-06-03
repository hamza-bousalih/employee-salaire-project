package com.example.employee.dao;

import com.example.employee.bean.Echelle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EchelleDao extends JpaRepository<Echelle,Long> {
    Echelle findByCode(String code);
    int deleteByCode(String code);
    List<Echelle> findByGradeCode(String code);
    boolean existsByCode(String code);
}

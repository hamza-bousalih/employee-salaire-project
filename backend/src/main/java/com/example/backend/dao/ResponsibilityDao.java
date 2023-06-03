package com.example.employee.dao;

import com.example.employee.bean.Responsibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponsibilityDao  extends JpaRepository<Responsibility,Long> {
    Responsibility findByCode(String code);
    int deleteByCode(String code);
    boolean existsByCode(String code);
}

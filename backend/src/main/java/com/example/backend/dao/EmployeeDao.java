package com.example.employee.dao;

import com.example.employee.bean.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeDao extends JpaRepository<Employee,Long> {
    Employee findByCin(String din);
    int deleteByCin(String din);
    List<Employee> findByEchelonCode(String code);
    List<Employee> findByEntiteAdministratifCode(String code);
    boolean existsByCinAndEntiteAdministratifCode(String cin, String code);
    boolean existsByCin(String cin);
}

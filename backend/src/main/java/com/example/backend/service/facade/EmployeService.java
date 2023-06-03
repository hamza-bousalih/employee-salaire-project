package com.example.employee.service.facade;

import com.example.employee.bean.Employee;

import java.util.List;

public interface EmployeService {
    List<Employee> findAll();
    Employee findByCin(String cin);
    int deleteByCin(String cin);
    boolean existsByCin(String cin);
    List<Employee> findByEchelonCode(String code);
    boolean isEmployeeInEntite(String cin, String code);
    void create(Employee employe);
    void update(Employee newEmploye);
    List<Employee> findByEntiteCode(String code);
}

package com.example.employee.service.impl;

import com.example.employee.bean.Employee;
import com.example.employee.dao.EmployeeDao;
import com.example.employee.service.facade.EmployeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeServiceImpl implements EmployeService {
    @Override
    public List<Employee> findAll() {
        return employeeDao.findAll();
    }

    @Override
    public Employee findByCin(String cin) {
        return employeeDao.findByCin(cin);
    }

    @Override
    public int deleteByCin(String cin) {
        return employeeDao.deleteByCin(cin);
    }

    @Override
    public boolean existsByCin(String cin) {
        return employeeDao.existsByCin(cin);
    }

    @Override
    public List<Employee> findByEchelonCode(String code) {
        return employeeDao.findByEchelonCode(code);
    }

    @Override
    public List<Employee> findByEntiteCode(String code) {
        return employeeDao.findByEntiteAdministratifCode(code);
    }

    @Override
    public boolean isEmployeeInEntite(String cin, String code) {
        return this.employeeDao.existsByCinAndEntiteAdministratifCode(cin,code);
    }

    @Override
    public void create(Employee employe) {
        employeeDao.save(employe);
    }

    @Override
    public void update(Employee employe) {
        employeeDao.save(employe);
    }

    private final  EmployeeDao employeeDao;
}

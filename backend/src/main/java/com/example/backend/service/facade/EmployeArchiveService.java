package com.example.employee.service.facade;

import com.example.employee.bean.EmployeArchive;

import java.util.List;

public interface EmployeArchiveService {
    List<EmployeArchive> findAll();

    int deleteByCin(String cin);

    int deleteByCode(String code);

    int multiDelete(List<String> cins);

    List<EmployeArchive> findAllByCin(String cin);

    int save(EmployeArchive employeArchive);
}

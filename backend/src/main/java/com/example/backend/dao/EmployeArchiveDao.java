package com.example.employee.dao;

import com.example.employee.bean.EmployeArchive;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeArchiveDao extends JpaRepository<EmployeArchive,Long> {
    int deleteByCin(String cin);
    int deleteByCode(String code);
    List<EmployeArchive> findAllByCin(String cin, Sort sort);
}

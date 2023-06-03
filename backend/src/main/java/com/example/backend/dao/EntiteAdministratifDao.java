package com.example.employee.dao;

import com.example.employee.bean.EntiteAdministratif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntiteAdministratifDao extends JpaRepository<EntiteAdministratif,Long> {
    EntiteAdministratif findByCode(String code);
    int deleteByCode(String code);
    boolean existsByCode(String code);
    EntiteAdministratif findByChefCin(String cin);
    boolean existsByChefCin(String cin);
}

package com.example.employee.service.facade;

import com.example.employee.bean.EntiteAdministratif;

import java.util.List;

public interface EntiteAdministarifService {
    EntiteAdministratif findByCode(String code);

    List<EntiteAdministratif> findAll();

    void create(EntiteAdministratif entiteAdministarif);

     void update(EntiteAdministratif newEntiteAdministarif);

    int delete(String code);

    EntiteAdministratif findByChefCin(String cin);

    void removeChef(String code);

    void updateMembersNum(EntiteAdministratif entiteAdministratif, int num);

    boolean isAlreadyChef(String cin);
}

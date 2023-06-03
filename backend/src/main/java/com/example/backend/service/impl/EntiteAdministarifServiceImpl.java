package com.example.employee.service.impl;

import com.example.employee.bean.EntiteAdministratif;
import com.example.employee.dao.EntiteAdministratifDao;
import com.example.employee.service.facade.EntiteAdministarifService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EntiteAdministarifServiceImpl implements EntiteAdministarifService {
    public final EntiteAdministratifDao entiteAdministarifDao;

    @Override
    public EntiteAdministratif findByCode(String code) {
        return entiteAdministarifDao.findByCode(code);
    }

    @Override
    public List<EntiteAdministratif> findAll() {
        return entiteAdministarifDao.findAll();
    }

    @Override
    public void create(EntiteAdministratif entiteAdministarif){
        entiteAdministarifDao.save(entiteAdministarif);
    }

    @Override
    public void update(EntiteAdministratif newEntiteAdministarif){
        entiteAdministarifDao.save(newEntiteAdministarif);
    }

    @Override
    public int delete(String code) {
        return entiteAdministarifDao.deleteByCode(code);
    }

    @Override
    public EntiteAdministratif findByChefCin(String cin) {
        return entiteAdministarifDao.findByChefCin(cin);
    }

    @Override
    public void removeChef(String cin) {
        EntiteAdministratif entiteAdministarif = new EntiteAdministratif();

        EntiteAdministratif oldEntite = findByChefCin(cin);
        if (oldEntite == null) return;

        entiteAdministarif.setId(oldEntite.getId());
        entiteAdministarif.setCode(oldEntite.getCode());
        entiteAdministarif.setLibelle(oldEntite.getLibelle());

        entiteAdministarifDao.save(entiteAdministarif);
    }

    @Override
    public void updateMembersNum(EntiteAdministratif entiteAdministratif, int num) {
        if (entiteAdministratif != null) {
            int membersNum = entiteAdministratif.getMembersNum() + num;
            if (membersNum < 0) membersNum = 0;
            entiteAdministratif.setMembersNum(membersNum);
            entiteAdministarifDao.save(entiteAdministratif);
        }
    }

    @Override
    public boolean isAlreadyChef(String cin) {
        return entiteAdministarifDao.existsByChefCin(cin);
    }

}

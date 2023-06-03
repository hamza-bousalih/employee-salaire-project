package com.example.employee.service.impl;

import com.example.employee.bean.EmployeArchive;
import com.example.employee.dao.EmployeArchiveDao;
import com.example.employee.service.facade.EmployeArchiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.employee.shared.CodeGenerator.generateCode;

@Service
@RequiredArgsConstructor
public class EmployeArchiveServiceImpl implements EmployeArchiveService {
    @Override
    public List<EmployeArchive> findAll() {
        return employeArchiveDao.findAll();
    }

    @Override
    public int deleteByCin(String cin) {
        return employeArchiveDao.deleteByCin(cin);
    }

    @Override
    public int deleteByCode(String code) {
        return employeArchiveDao.deleteByCode(code);
    }

    @Override
    public int multiDelete(List<String> codes) {
        int deleted = 0;
        for (String code: codes) {
            deleteByCode(code);
            deleted++;
        }
        return deleted;
    }

    @Override
    public List<EmployeArchive> findAllByCin(String cin) {
        return employeArchiveDao.findAllByCin(cin, Sort.by(Sort.Direction.DESC,"deleteDate"));
    }

    @Override
    public int save(EmployeArchive employeArchive) {
        employeArchive.setCode(generateCode("X"));
        employeArchiveDao.save(employeArchive);
        return 1;
    }

    private final EmployeArchiveDao employeArchiveDao;
}

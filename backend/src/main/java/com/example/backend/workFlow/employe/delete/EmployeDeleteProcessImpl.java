package com.example.employee.workFlow.employe.delete;

import com.example.employee.bean.EmployeArchive;
import com.example.employee.bean.Employee;
import com.example.employee.bean.EntiteAdministratif;
import com.example.employee.service.facade.*;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class EmployeDeleteProcessImpl implements EmployeDeleteProcess {
    @Override
    public int run(String cin, String raison) {
        int totalDeleted = 0;

        Employee employee = employeService.findByCin(cin);
        if (employee == null) {
            return -1;
        }

        totalDeleted += deleteMandates(employee);
        totalDeleted += deleteSalaries(employee);
        totalDeleted += deleteEmployee(employee, raison);

        return totalDeleted;
    }

    private int deleteMandates(Employee employee) {
        return mandatService.deleteByEmployeeCin(employee.getCin());
    }

    private int deleteSalaries(Employee employee) {
        return salaireService.deleteByEmployeeCin(employee.getCin());
    }

    private int deleteEmployee(Employee employee, String raison) {
        entiteAdministarifService.removeChef(employee.getCin());

        createArchive(employee, raison);

        EntiteAdministratif entiteAdministratif = employee.getEntiteAdministratif();
        entiteAdministarifService.updateMembersNum(entiteAdministratif, -1);

        return employeService.deleteByCin(employee.getCin());
    }

    private void createArchive(Employee employee, String raison) {
        EmployeArchive employeArchive = new EmployeArchive();
        employeArchive.setCin(employee.getCin());
        employeArchive.setNom(employee.getNom());
        employeArchive.setPrenom(employee.getPrenom());
        employeArchive.setDeleteRaison(raison);
        employeArchiveService.save(employeArchive);
    }

    private final EmployeService employeService;
    private final EmployeArchiveService employeArchiveService;
    private final EntiteAdministarifService entiteAdministarifService;
    private final MandatService mandatService;
    private final DetailSalaireService salaireService;
}

package com.example.employee.workFlow.entiteAdministarif.delete;

import com.example.employee.bean.Employee;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.service.facade.EntiteAdministarifService;
import com.example.employee.workFlow.employe.delete.EmployeDeleteProcess;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class EntiteAdministarifDeleteProcessImpl implements EntiteAdministarifDeleteProcess {
    @Override
    public int run(String code, boolean force) {
        int totalDeleted = 0;

        int entiteMember = entiteService.findByCode(code).getMembersNum();

        if (entiteMember > 0){
            if (force) { // delete employees then delete the entite
                List<Employee>  employees = employeService.findByEntiteCode(code);
                for (Employee employee: employees) {
                    totalDeleted += employeDeleteProcess.run(employee.getCin(), "delete Entite Administratif");
                }
                totalDeleted += entiteService.delete(code);

            } else return -1; // can't delete the entite, it contains members
        } else totalDeleted += entiteService.delete(code); // delete the entite if it doesn't contain any members

        return totalDeleted;
    }

    private final EntiteAdministarifService entiteService;
    private final EmployeService employeService;
    private final EmployeDeleteProcess employeDeleteProcess;
}

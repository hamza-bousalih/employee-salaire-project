package com.example.employee.workFlow.detailSalaire.calcSalary;

import com.example.employee.bean.DetailSalaire;
import com.example.employee.bean.Employee;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.workFlow.detailSalaire.save.DetailSalaireSaveProcess;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
public class
CalcSalaryProcessImpl implements CalcSalaryProcess{
    @Override
    public int run(String salaryMonth) {
        LocalDate month = LocalDate.parse(salaryMonth);

        List<Employee> employes = employeService.findAll();

         for (Employee employe: employes) {
             DetailSalaire detailSalaire1 = new DetailSalaire();
             detailSalaire1.setEmployee(employe);
             detailSalaire1.setMonth(month);
             detailSalaireSaveProcess.run(detailSalaire1);
         }

        return 1;
    }

    private final EmployeService employeService;
    private final DetailSalaireSaveProcess detailSalaireSaveProcess;
}
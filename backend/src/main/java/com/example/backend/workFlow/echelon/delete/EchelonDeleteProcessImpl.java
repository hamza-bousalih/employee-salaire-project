package com.example.employee.workFlow.echelon.delete;

import com.example.employee.bean.Employee;
import com.example.employee.service.facade.EchelonService;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.workFlow.employe.delete.EmployeDeleteProcess;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class EchelonDeleteProcessImpl implements EchelonDeleteProcess {
    @Override
    public int run(String code) {
        int totalDelete = 0;

        if (echelonService.existsByCode(code)) {

            List<Employee> employees = employeService.findByEchelonCode(code);
            if (employees != null) {
                for (Employee emp: employees) {
                    totalDelete += employeDeleteProcess.run(emp.getCin(), "Delete the echelon");
                }
            }

            totalDelete += echelonService.deleteByCode(code);
        }

        return totalDelete;
    }

    private final EchelonService echelonService;
    private final EmployeService employeService;
    private final EmployeDeleteProcess employeDeleteProcess;
}

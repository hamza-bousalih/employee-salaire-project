package com.example.employee.workFlow.employe.update;

import com.example.employee.bean.Employee;

public interface EmployeUpdateProcess {
    int run(String oldCin, Employee newEmploye);
}

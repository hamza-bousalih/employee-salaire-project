package com.example.employee.workFlow.detailSalaire.save;

import com.example.employee.bean.DetailSalaire;
import com.example.employee.bean.Employee;
import com.example.employee.bean.Mandat;
import com.example.employee.bean.Responsibility;
import com.example.employee.service.facade.DetailSalaireService;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.service.facade.MandatService;
import com.example.employee.workFlow.detailSalaire.update.DetailSalaireUpdateProcess;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

import static com.example.employee.shared.CodeGenerator.generateCode;
import static com.example.employee.shared.IsEmptyString.isEmpty;

@AllArgsConstructor
public class DetailSalaireSaveProcessImpl implements DetailSalaireSaveProcess {
    private static final int ERROR_EMPLOYEE_REQUIRED = -1;
    private static final int ERROR_EMPLOYEE_CIN_REQUIRED = -2;
    private static final int ERROR_EMPLOYEE_NOT_FOUND = -3;
    @Override
    public int run(DetailSalaire detailSalaire) {
        // generate the code
        String code = generateCode("DS");
        detailSalaire.setCode(code);

        // get the month
        LocalDate salaryDate = detailSalaire.getMonth();
        if (salaryDate == null)
            salaryDate = LocalDate.now();
        LocalDate startOfMonth = salaryDate.withDayOfMonth(1); // get first day of the month
        LocalDate endOfMonth = salaryDate.withDayOfMonth(
                salaryDate.getMonth().length(salaryDate.isLeapYear())); // get first day of the month

        // check the given employee
        Employee givenEmploye = detailSalaire.getEmployee();
        if (givenEmploye == null) return ERROR_EMPLOYEE_REQUIRED;

        String cin = givenEmploye.getCin();
        if (isEmpty(cin)) return ERROR_EMPLOYEE_CIN_REQUIRED;

        Employee employe = employeService.findByCin(cin);
        if (employe == null) return ERROR_EMPLOYEE_NOT_FOUND;

        // get employee responsibility
        double responsibilityPrime = employeeResp(detailSalaire, startOfMonth, endOfMonth);

        // set the month
        detailSalaire.setMonth(endOfMonth);

        // set employee and its base salary
        detailSalaire.setEmployee(employe);
        double salaireBase = employe.getSalaireBase();
        detailSalaire.setSalaireBase(salaireBase);

        // calc and set prime generale
        detailSalaire.setPrimeGeneral(salaireBase + responsibilityPrime);

        // check the existing and update the old one
        boolean isExist = detailSalaireService.existsByEmployeeCinAndMonth(cin,endOfMonth);
        if (isExist) {
            detailSalaireUpdateProcess.run(detailSalaire);
            return 2;
        }

        detailSalaireService.save(detailSalaire);
        return 1;
    }

    private double employeeResp(DetailSalaire detailSalaire, LocalDate startOfMonth, LocalDate endOfMonth) {
        double responsibilityPrime = 0; // set responsibility prime to 0 as default
        Mandat mandat =
                mandatService.findByEmployeeCinAndStartDateLessThanAndEndDateGreaterThan
                        (detailSalaire.getEmployee().getCin(), endOfMonth, startOfMonth);
        if (mandat != null) {
            Responsibility responsibility = mandat.getResponsibility();

            // set responsibility and its prime
            detailSalaire.setResponsibility(responsibility);
            responsibilityPrime = responsibility.getPrime();
            detailSalaire.setResponsibilityPrime(responsibilityPrime);
        }
        return responsibilityPrime;
    }

    private final DetailSalaireService detailSalaireService;
    private final EmployeService employeService;
    private final MandatService mandatService;
    private final DetailSalaireUpdateProcess detailSalaireUpdateProcess;
}

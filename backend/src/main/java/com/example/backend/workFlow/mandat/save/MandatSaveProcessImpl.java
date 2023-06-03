package com.example.employee.workFlow.mandat.save;

import com.example.employee.bean.Employee;
import com.example.employee.bean.Mandat;
import com.example.employee.bean.Responsibility;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.service.facade.MandatService;
import com.example.employee.service.facade.ResponsibilityService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.CodeGenerator.generateCode;
import static com.example.employee.shared.IsEmptyString.isEmpty;

@RequiredArgsConstructor
public class MandatSaveProcessImpl implements MandatSaveProcess {
    private static final int ERROR_EMPLOYEE_REQUIRED = -1;
    private static final int ERROR_EMPLOYEE_CIN_REQUIRED = -2;
    private static final int ERROR_EMPLOYEE_NOT_FOUND = -3;
    private static final int ERROR_EMPLOYEE_CAN_HAVE_ONE_RESP = -4;
    private static final int ERROR_RESPONSIBILITY_REQUIRED = -5;
    private static final int ERROR_RESPONSIBILITY_CODE_REQUIRED = -6;
    private static final int ERROR_RESPONSIBILITY_NOT_FOUND = -7;
    private static final int ERROR_DATES_REQUIRED = -8;
    private static final int ERROR_END_DATE_BEFORE_START_DATE = -9;

    @Override
    public int run(Mandat mandat) {
        mandat.setCode(generateCode("m"));

        int result = employeeValidate(mandat);
        if (result < 0) return result;

        result = responsibilityValidate(mandat);
        if (result < 0) return result;

        result = datesValidate(mandat);
        if (result < 0) return result;

        mandatService.create(mandat);
        return 1;
    }

    private int employeeValidate (Mandat mandat) {
        // check the given employee
        Employee givenEmployee = mandat.getEmployee();
        if (givenEmployee == null) return ERROR_EMPLOYEE_REQUIRED;

        String givenEmployeCin =  givenEmployee.getCin();
        if (isEmpty(givenEmployeCin)) return ERROR_EMPLOYEE_CIN_REQUIRED;

        Employee employe = employeService.findByCin(givenEmployeCin);
        if (employe == null) return ERROR_EMPLOYEE_NOT_FOUND;

        boolean isAlreadyHaveResp =
                mandatService.isEmployeeHaveResp(givenEmployeCin, mandat.getStartDate());
        if (isAlreadyHaveResp) return ERROR_EMPLOYEE_CAN_HAVE_ONE_RESP;

        mandat.setEmployee(employe);
        return 1;
    }
    private int responsibilityValidate(Mandat mandat) {
        Responsibility  givenResp = mandat.getResponsibility();
        if (givenResp == null) return ERROR_RESPONSIBILITY_REQUIRED;
        if (isEmpty(givenResp.getCode())) return ERROR_RESPONSIBILITY_CODE_REQUIRED;
        Responsibility responsibility = responsibilityService.findByCode(givenResp.getCode());
        if (responsibility == null) return ERROR_RESPONSIBILITY_NOT_FOUND;

        mandat.setResponsibility(responsibility);
        mandat.setPrime(responsibility.getPrime());
        return 1;
    }
    private int datesValidate(Mandat mandat) {
        if (mandat.getEndDate() == null ||
                mandat.getStartDate() == null) return ERROR_DATES_REQUIRED;
        if (mandat.getEndDate().isBefore(mandat.getStartDate())) return ERROR_END_DATE_BEFORE_START_DATE;
        return 1;
    }

    private final MandatService mandatService;
    private final ResponsibilityService responsibilityService;
    private final EmployeService employeService;
}

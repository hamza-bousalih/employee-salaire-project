package com.example.employee.workFlow.mandat.update;

import com.example.employee.bean.Employee;
import com.example.employee.bean.Mandat;
import com.example.employee.bean.Responsibility;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.service.facade.MandatService;
import com.example.employee.service.facade.ResponsibilityService;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@RequiredArgsConstructor
public class MandatUpdateProcessImpl implements MandatUpdateProcess{
    private static final int ERROR_MANDAT_NOT_FOUND = -1;
    private static final int ERROR_EMPLOYEE_NOT_FOUND = -2;
    private static final int ERROR_RESPONSIBILITY_NOT_FOUND = -3;

    private static final int ERROR_END_DATE_BEFORE_START_DATE = -4;
    @Override
    public int run(Mandat newMandat) {
        Mandat oldMandat = mandatService.findByCode(newMandat.getCode());
        if (oldMandat == null) return ERROR_MANDAT_NOT_FOUND;

        int result = updateEmployee(oldMandat, newMandat);
        if (result < 0) return  result;

        result = updateResponsibility(oldMandat, newMandat);
        if (result < 0) return  result;

        result = updateDates(oldMandat, newMandat);
        if (result < 0) return  result;

        mandatService.update(oldMandat);
        return 1;
    }

    private int updateEmployee(Mandat oldMandat, Mandat newMandat) {
        String oldEmployeeCin = oldMandat.getEmployee().getCin();
        String newEmployeeCin = newMandat.getEmployee().getCin();
        if (!newEmployeeCin.equals(oldEmployeeCin)) {
            Employee newEmployee = employeService.findByCin(newEmployeeCin);
            if (newEmployee == null) return ERROR_EMPLOYEE_NOT_FOUND;
            oldMandat.setEmployee(newEmployee);
        }
        return 1;
    }
    private int updateResponsibility(Mandat oldMandat, Mandat newMandat) {
        String oldRespCode = oldMandat.getResponsibility().getCode();
        String newRespCode = newMandat.getResponsibility().getCode();
        if (!newRespCode.equals(oldRespCode)) {
            Responsibility newResp = responsibilityService.findByCode(newRespCode);
            if (newResp == null) return ERROR_RESPONSIBILITY_NOT_FOUND;
            oldMandat.setResponsibility(newResp);
            oldMandat.setPrime(newResp.getPrime());
        }
        return 1;
    }
    private int updateDates(Mandat oldMandat, Mandat newMandat) {
        LocalDate newStartDate = newMandat.getStartDate();
        LocalDate newEndDate = newMandat.getEndDate();
        if (newEndDate.isBefore(newStartDate)) return ERROR_END_DATE_BEFORE_START_DATE;

        oldMandat.setStartDate(newStartDate);
        oldMandat.setEndDate(newEndDate);
        return 1;
    }

    private final MandatService mandatService;
    private final ResponsibilityService responsibilityService;
    private final EmployeService employeService;
}

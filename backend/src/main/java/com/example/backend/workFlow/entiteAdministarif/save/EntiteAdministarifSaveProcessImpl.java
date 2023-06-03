package com.example.employee.workFlow.entiteAdministarif.save;

import com.example.employee.bean.Employee;
import com.example.employee.bean.EntiteAdministratif;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.service.facade.EntiteAdministarifService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.CodeGenerator.generateCode;
import static com.example.employee.shared.IsEmptyString.isEmpty;

@RequiredArgsConstructor
public class EntiteAdministarifSaveProcessImpl implements EntiteAdministarifSaveProcess {
    private static final int ERROR_LIBELLE_REQUIRED = -1;
    private static final int ERROR_EMPLOYEE_IS_CHEF = -2;
    private static final int ERROR_EMPLOYEE_NOT_FOUND = -3;
    @Override
    public int run(EntiteAdministratif entiteAdministarif) {
        EntiteAdministratif newEntiteAdministarif;
        newEntiteAdministarif = new EntiteAdministratif();

        newEntiteAdministarif.setCode(generateCode("EA"));

        String libelle = entiteAdministarif.getLibelle();
        if (isEmpty(libelle)) return ERROR_LIBELLE_REQUIRED;
        newEntiteAdministarif.setLibelle(libelle);

        int result = chefValidate(entiteAdministarif, newEntiteAdministarif);
        if (result < 0) return result;

        entiteAdministarifService.create(newEntiteAdministarif);
        return 1;
    }

    private int chefValidate(
            EntiteAdministratif entiteAdministarif,
            EntiteAdministratif newEntiteAdministarif) {
        Employee givenChef = entiteAdministarif.getChef();
        if (givenChef != null &&
                !isEmpty(givenChef.getCin())) {

            String cin = givenChef.getCin();
            boolean isAlreadyChef = entiteAdministarifService.isAlreadyChef(cin);
            if (isAlreadyChef) return ERROR_EMPLOYEE_IS_CHEF;

            Employee chef = employeService.findByCin(cin);
            if (chef == null) return ERROR_EMPLOYEE_NOT_FOUND;

            newEntiteAdministarif.setChef(chef);
        }

        return 1;
    }

    private final EntiteAdministarifService entiteAdministarifService;
    private final EmployeService employeService;
}

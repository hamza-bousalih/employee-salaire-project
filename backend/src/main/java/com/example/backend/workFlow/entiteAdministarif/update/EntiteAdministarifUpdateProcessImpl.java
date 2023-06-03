package com.example.employee.workFlow.entiteAdministarif.update;

import com.example.employee.bean.Employee;
import com.example.employee.bean.EntiteAdministratif;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.service.facade.EntiteAdministarifService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.IsEmptyString.isEmpty;

@RequiredArgsConstructor
public class EntiteAdministarifUpdateProcessImpl implements EntiteAdministarifUpdateProcess{
    private static final int CODE_REQUIRED = -1;
    private static final int ENTITE_NOT_FOUND = -2;
    private static final int LIBELLE_REQUIRED = -3;
    private static final int CHEF_NOT_MEMBER = -4;
    private static final int CHEF_ALREADY_ASSIGNED = -5;
    private static final int CHEF_NOT_FOUND = -6;

    @Override
    public int run(EntiteAdministratif newEntiteAdmin) {
        String code = newEntiteAdmin.getCode();
        if (isEmpty(code)) {
            return CODE_REQUIRED;
        }

        EntiteAdministratif oldEntiteAdmin = entiteAdministarifService.findByCode(code);
        if (oldEntiteAdmin == null) {
            return ENTITE_NOT_FOUND;
        }

        EntiteAdministratif updatedEntiteAdmin = new EntiteAdministratif();
        int result  = setEntiteAdminFields(newEntiteAdmin, oldEntiteAdmin, updatedEntiteAdmin);
        if (result < 0) {
            return result;
        }

        entiteAdministarifService.update(updatedEntiteAdmin);
        return 1;
    }

    private int setEntiteAdminFields(EntiteAdministratif newEntiteAdmin, EntiteAdministratif oldEntiteAdmin, EntiteAdministratif updatedEntiteAdmin) {
        updatedEntiteAdmin.setId(oldEntiteAdmin.getId());
        updatedEntiteAdmin.setCode(newEntiteAdmin.getCode());
        updatedEntiteAdmin.setMembersNum(oldEntiteAdmin.getMembersNum());

        String libelle = newEntiteAdmin.getLibelle();
        if (isEmpty(libelle)) {
            return LIBELLE_REQUIRED;
        }
        updatedEntiteAdmin.setLibelle(libelle);

        int result = setNewChef(newEntiteAdmin, oldEntiteAdmin.getChef(),updatedEntiteAdmin);
        if (result < 0) {
            return result;
        }

        return 1;
    }

    private int setNewChef(EntiteAdministratif newEntiteAdmin, Employee oldChef, EntiteAdministratif updatedEntiteAdmin) {
        Employee givenChef = newEntiteAdmin.getChef();

        if (givenChef == null || isEmpty(givenChef.getCin())) givenChef = oldChef;
        else {
            String givenChefCin = givenChef.getCin();

            if (!employeService.isEmployeeInEntite(givenChefCin, newEntiteAdmin.getCode())) {
                return CHEF_NOT_MEMBER;
            }

            if (entiteAdministarifService.isAlreadyChef(givenChefCin)) {
                return CHEF_ALREADY_ASSIGNED;
            }

            Employee newChef = employeService.findByCin(givenChefCin);
            if (newChef == null) {
                return CHEF_NOT_FOUND;
            }
        }

        updatedEntiteAdmin.setChef(givenChef);
        return 1;
    }


    private final EntiteAdministarifService entiteAdministarifService;
    private final EmployeService employeService;
}

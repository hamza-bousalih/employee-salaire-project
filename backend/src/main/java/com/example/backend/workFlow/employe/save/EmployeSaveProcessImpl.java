package com.example.employee.workFlow.employe.save;

import com.example.employee.bean.Echelon;
import com.example.employee.bean.Employee;
import com.example.employee.bean.EntiteAdministratif;
import com.example.employee.service.facade.EchelonService;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.service.facade.EntiteAdministarifService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.IsEmptyString.isEmpty;


@RequiredArgsConstructor
public class EmployeSaveProcessImpl implements EmployeSaveProcess{
    private static final int SUCCESS = 1;
    private static final int ERROR_CIN_REQUIRED = -1;
    private static final int ERROR_CIN_ALREADY_USED = -2;
    private static final int ERROR_MONTH_NUMBER_POSITIVE = -3;
    private static final int ERROR_NOM_REQUIRED = -4;
    private static final int ERROR_PRENOM_REQUIRED = -5;
    private static final int ERROR_ECHELLON_REQUIRED = -6;
    private static final int ERROR_ECHELON_CODE_REQUIRED = -7;
    private static final int ERROR_TARGETED_ECHELLON_NOT_FOUND = -8;
    private static final int ERROR_ENTITE_ADMINISTRATIF_REQUIRED = -9;
    private static final int ERROR_ENTITE_ADMINISTRATIF_CODE_REQUIRED = -10;
    private static final int ERROR_TARGETED_ENTITE_ADMINISTRATIF_NOT_FOUND = -11;

    @Override
    public int run(Employee employe) {
        // checking the cin
        String cin = employe.getCin();
        int result = cinChecker(cin);
        if (result < 0 ) return result;

        result = otherAttChecker(employe);
        if (result < 0 ) return result;

        result = echelonChecker(employe);
        if (result < 0 ) return result;

        result = entiteChecker(employe);
        if (result < 0 ) return result;

        employeService.create(employe);
        return SUCCESS;
    }

    private int cinChecker(String cin) {
        int result = 1;

        if (isEmpty(cin)) result =  ERROR_CIN_REQUIRED;
        if (employeService.findByCin(cin) != null) result =  ERROR_CIN_ALREADY_USED;

        return result;
    }

    private int otherAttChecker(Employee employe) {
        int result = 1;

        if (employe.getNumMois() < 0) result =  ERROR_MONTH_NUMBER_POSITIVE;
        if (isEmpty(employe.getNom())) result =  ERROR_NOM_REQUIRED;
        if (isEmpty(employe.getPrenom())) return ERROR_PRENOM_REQUIRED;

        return result;
    }

    private int echelonChecker(Employee employe) {
        Echelon givenEchellon = employe.getEchelon();
        if (givenEchellon == null) return ERROR_ECHELLON_REQUIRED;

        String echelonCode = givenEchellon.getCode();
        if (isEmpty(echelonCode)) return ERROR_ECHELON_CODE_REQUIRED;

        Echelon echellon = echelonService.findByCode(echelonCode);
        if (echellon == null) return ERROR_TARGETED_ECHELLON_NOT_FOUND;

        employe.setEchelon(echellon);
        employe.setSalaireBase(echellon.getPrime());
        return 1;
    }

    private int entiteChecker(Employee employe) {
        EntiteAdministratif givenEntite = employe.getEntiteAdministratif();
        if (givenEntite == null) return ERROR_ENTITE_ADMINISTRATIF_REQUIRED;

        String entiteCode = givenEntite.getCode();
        if (isEmpty(entiteCode)) return ERROR_ENTITE_ADMINISTRATIF_CODE_REQUIRED;

        EntiteAdministratif entiteAdministratif = entiteAdministarifService.findByCode(entiteCode);
        if (entiteAdministratif == null) return ERROR_TARGETED_ENTITE_ADMINISTRATIF_NOT_FOUND;

        // increment number of members in target entite
        entiteAdministarifService.updateMembersNum(entiteAdministratif, 1);
        employe.setEntiteAdministratif(entiteAdministratif);
        return 1;
    }

    private final EmployeService employeService;
    private final EchelonService echelonService;
    private final EntiteAdministarifService entiteAdministarifService;
}

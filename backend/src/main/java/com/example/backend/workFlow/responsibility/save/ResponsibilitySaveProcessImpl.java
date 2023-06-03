package com.example.employee.workFlow.responsibility.save;

import com.example.employee.bean.Echelon;
import com.example.employee.bean.Responsibility;
import com.example.employee.service.facade.EchelonService;
import com.example.employee.service.facade.ResponsibilityService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.CodeGenerator.*;
import static com.example.employee.shared.IsEmptyString.*;

@RequiredArgsConstructor
public class ResponsibilitySaveProcessImpl implements ResponsibilitySaveProcess{
    private static final int ERROR_LIBELLE_REQUIRED = -1;
    private static final int ERROR_PRIME_NEGATIVE = -2;
    private static final int ERROR_ECHELON_REQUIRED = -3;
    private static final int ERROR_ECHELON_CODE_REQUIRED = -4;
    private static final int ERROR_ECHELON_NOT_FOUND = -5;
    @Override
    public int run(Responsibility responsibility) {
        responsibility.setCode(generateCode("r"));

        if (isEmpty(responsibility.getLibelle())) return ERROR_LIBELLE_REQUIRED;

        if (responsibility.getPrime() < 0) return ERROR_PRIME_NEGATIVE;

        int result = echelonValidate(responsibility);
        if (result < 0 ) return result;

        responsibilityService.create(responsibility);
        return 1;
    }

    private int echelonValidate(Responsibility responsibility) {
        Echelon givenEchelon = responsibility.getEchelon();
        if (givenEchelon == null) return ERROR_ECHELON_REQUIRED;

        if (isEmpty(givenEchelon.getCode())) return ERROR_ECHELON_CODE_REQUIRED;

        Echelon echelon = echelonService.findByCode(givenEchelon.getCode()); // get echelon from database
        if (echelon == null) return ERROR_ECHELON_NOT_FOUND;

        responsibility.setEchelon(echelon);
        return 1;
    }

    private final ResponsibilityService responsibilityService;
    private final EchelonService echelonService;
}

package com.example.employee.workFlow.responsibility.update;

import com.example.employee.bean.Echelon;
import com.example.employee.bean.Mandat;
import com.example.employee.bean.Responsibility;
import com.example.employee.service.facade.EchelonService;
import com.example.employee.service.facade.MandatService;
import com.example.employee.service.facade.ResponsibilityService;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import static com.example.employee.shared.IsEmptyString.*;

@RequiredArgsConstructor
public class ResponsibilityUpdateProcessImp implements ResponsibilityUpdateProcess{
    private static final int ERROR_RESPONSIBILITY_CODE_REQUIRED = -1;
    private static final int ERROR_RESPONSIBILITY_NOT_FOUND = -2;
    private static final int ERROR_PRIME_NEGATIVE = -3;
    private static final int ERROR_ECHELON_NOT_FOUND = -4;

    @Override
    public int run(Responsibility newResponsibility) {
        String code = newResponsibility.getCode();
        if (isEmpty(code)) return ERROR_RESPONSIBILITY_CODE_REQUIRED;

        Responsibility oldResponsibility = responsibilityService.findByCode(code);
        if (oldResponsibility == null) return ERROR_RESPONSIBILITY_NOT_FOUND;

        int result = updatePrime(oldResponsibility, newResponsibility);
        if (result < 0) return result;

        result = updateEchelon(oldResponsibility, newResponsibility);
        if (result < 0) return result;

        oldResponsibility.setLibelle(newResponsibility.getLibelle());

        responsibilityService.update(oldResponsibility);
        return 1;
    }

    private int updatePrime(Responsibility oldResponsibility, Responsibility newResponsibility) {
        double prime = newResponsibility.getPrime();
        if (prime < 0) return ERROR_PRIME_NEGATIVE;

        double oldPrime = oldResponsibility.getPrime();
        if (oldPrime != prime) {
            oldResponsibility.setPrime(prime);

            // change prime of mandat of this responsibility
            // this change will only apply to mandats with endDate greater than current date
            List<Mandat> mandats =
                    mandatService.findMandatByRespCodeAndEndDate(
                            newResponsibility.getCode(), LocalDate.now());
            for (Mandat mandat: mandats) {
                mandatService.updatePrime(mandat.getId(), prime);
            }
        }

        return 1;
    }
    private int updateEchelon(Responsibility oldResponsibility, Responsibility newResponsibility) {
        String oldEchelonCode = oldResponsibility.getEchelon().getCode();
        String newEchelonCode = newResponsibility.getEchelon().getCode();

        if (!oldEchelonCode.equals(newEchelonCode)) {

            Echelon newEchelon = echelonService.findByCode(newEchelonCode);
            if (newEchelon == null) return ERROR_ECHELON_NOT_FOUND;
            oldResponsibility.setEchelon(newEchelon);
        }

        return 1;
    }

    private final ResponsibilityService responsibilityService;
    private final EchelonService echelonService;
    private final MandatService mandatService;
}

package com.example.employee.workFlow.echelon.save;

import com.example.employee.bean.Echelle;
import com.example.employee.bean.Echelon;
import com.example.employee.service.facade.EchelleService;
import com.example.employee.service.facade.EchelonService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.CodeGenerator.generateCode;
import static com.example.employee.shared.IsEmptyString.isEmpty;

@RequiredArgsConstructor
public class EchelonSaveProcessImpl implements EchelonSaveProcess {
    private static final int ERROR_LIBELLE_REQUIRED = -1;
    private static final int ERROR_ECHELON_REQUIRED = -2;
    private static final int ERROR_ECHELLE_CODE_REQUIRED = -3;
    private static final int ERROR_ECHELLE_NOT_FOUND = -4;
    private static final int ERROR_NEXT_ECHELON_NOT_FOUND = -5;
    private static final int ERROR_PREV_ECHELON_NOT_FOUND = -6;
    private static final int ERROR_PRIME_NEGATIVE = -7;
    private static final int ERROR_DELAI_NEGATIVE = -8;

    @Override
    public int run(Echelon newEchelon) {
        Echelon echelon = new Echelon(); // var present our echelon we want to save

        String code = generateCode("en");

        int result = requiresValidate(newEchelon, echelon);
        if (result < 0) return result;

        result = nextEchelonValidate(newEchelon,echelon);
        if (result < 0 ) return result;

        result = prevEchelonValidate(newEchelon,echelon);
        if (result < 0 ) return result;

        echelon.setCode(code);
        echelon.setLibelle(newEchelon.getLibelle());

        echelonService.create(echelon);
        return 1;
    }

    private int requiresValidate(Echelon newEchelon, Echelon echelon) {
        if (isEmpty(newEchelon.getLibelle())) return ERROR_LIBELLE_REQUIRED;  // libelle is required

        Echelle givenEchelle = newEchelon.getEchelle();
        if (givenEchelle == null) return ERROR_ECHELON_REQUIRED; // echelle is required

        String givenEchelleCode = givenEchelle.getCode();
        if (isEmpty(givenEchelleCode)) return ERROR_ECHELLE_CODE_REQUIRED; // echelle code is required

        Echelle echelle = echelleService.findByCode(givenEchelle.getCode());
        if (echelle == null) return ERROR_ECHELLE_NOT_FOUND; // echelle have be in database

        // check th prime
        double prime = newEchelon.getPrime();
        if (prime < 0) return ERROR_PRIME_NEGATIVE;

        // check the delai
        int delai = newEchelon.getDelai();
        if (delai < 0) return ERROR_DELAI_NEGATIVE;

        echelon.setPrime(prime);
        echelon.setDelai(delai);
        echelon.setEchelle(echelle);
        return 1;
    }
    private int nextEchelonValidate(Echelon newEchelon, Echelon echelon) {
        Echelon nextEchelon = newEchelon.getEchelonSuiv();
        if (nextEchelon != null) {
            String nextEchelonCode = nextEchelon.getCode();
            if (!isEmpty(nextEchelonCode)) {
                Echelon nextEchelonDB = echelonService.findByCode(nextEchelonCode);
                if (nextEchelonDB == null) return ERROR_NEXT_ECHELON_NOT_FOUND; // the targeted next echelon have to exist in database
                echelon.setEchelonSuiv(nextEchelonDB);
            }
        }
        return 1;
    }
    private int prevEchelonValidate(Echelon newEchelon, Echelon echelon) {
        Echelon prevEchelon = newEchelon.getEchelonPrec();
        if (prevEchelon != null) {
            String prevEchelonCode = prevEchelon.getCode();
            if (!isEmpty(prevEchelonCode)) {
                Echelon prevEchelonDB = echelonService.findByCode(prevEchelonCode);
                if (prevEchelonDB == null) return ERROR_PREV_ECHELON_NOT_FOUND; // the targeted prev echelon have to exist in database
                echelon.setEchelonPrec(prevEchelonDB);
            }
        }
        return 1;
    }

    private final EchelonService echelonService;
    private final EchelleService echelleService;
}

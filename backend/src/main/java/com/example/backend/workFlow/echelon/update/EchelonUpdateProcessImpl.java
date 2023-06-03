package com.example.employee.workFlow.echelon.update;

import com.example.employee.bean.Echelle;
import com.example.employee.bean.Echelon;
import com.example.employee.bean.Employee;
import com.example.employee.service.facade.EchelleService;
import com.example.employee.service.facade.EchelonService;
import com.example.employee.service.facade.EmployeService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.example.employee.shared.IsEmptyString.isEmpty;

@RequiredArgsConstructor
public class EchelonUpdateProcessImpl implements EchelonUpdateProcess {
    private static final int ERROR_ECHELON_CODE_REQUIRED = -1;
    private static final int ERROR_ECHELON_NOT_FOUND = -2;
    private static final int ERROR_PRIME_NEGATIVE = -3;
    private static final int ERROR_DELAI_NEGATIVE = -4;
    private static final int ERROR_ECHELLE_CODE_REQUIRED = -5;
    private static final int ERROR_ECHELLE_NOT_FOUND = -6;
    private static final int ERROR_NEXT_EQUAL_CURRENT = -7;
    private static final int ERROR_NEXT_ECHELON_NOT_FOUND = -8;
    private static final int ERROR_PREV_EQUAL_CURRENT = -9;
    private static final int ERROR_PREV_ECHELON_NOT_FOUND = -10;

    @Override
    public int run(Echelon newEchelon) {
        Echelon echelon = new Echelon(); // var to set all new updates

        String code = newEchelon.getCode();
        if (isEmpty(code)) return ERROR_ECHELON_CODE_REQUIRED;

        Echelon oldEchelon = echelonService.findByCode(code);
        if (oldEchelon == null) return ERROR_ECHELON_NOT_FOUND;

        int result = primeDelaiValidate(oldEchelon, newEchelon, echelon);
        if (result < 0) return result;

        // check the libelle
        String newLibelle = newEchelon.getLibelle();
        if (isEmpty(newLibelle)) newLibelle = oldEchelon.getLibelle();

        // check Echelle
        result = echelleValidate(oldEchelon, newEchelon, echelon);
        if (result < 0) return result;

        // check nextEchellon
        result = nextEchellonValidate(oldEchelon, newEchelon, echelon);
        if (result < 0) return result;

        // check prevEchellon
        result = prevEchellonValidate(oldEchelon, newEchelon, echelon);
        if (result < 0) return result;

        // update base salary of the employee that have this echelon
        updateBaseSalary(oldEchelon, newEchelon, echelon);

        // set all new properties to the echelon var
        echelon.setId(oldEchelon.getId());
        echelon.setCode(code);
        echelon.setLibelle(newLibelle);

        echelonService.update(echelon);
        return 1;
    }

    private int primeDelaiValidate(Echelon oldEchelon, Echelon newEchelon, Echelon echelon) {
        // check the prime
        double newPrime = newEchelon.getPrime();
        double oldPrime = oldEchelon.getPrime();
        if (newPrime == 0L) newPrime = oldPrime; // take old prime if new prime not given
        else if (newPrime < 0) return ERROR_PRIME_NEGATIVE;

        // check the delai
        int newDelai = newEchelon.getDelai();
        if (newDelai == 0) newDelai = oldEchelon.getDelai(); // take old delai if new delai not given
        if (newDelai < 0 ) return ERROR_DELAI_NEGATIVE;

        echelon.setPrime(newPrime);
        echelon.setDelai(newDelai);
        return 1;
    }
    private int echelleValidate(Echelon oldEchelon, Echelon newEchelon, Echelon echelon){
        Echelle newEchelle = newEchelon.getEchelle();
        if (newEchelle != null) {
            String newEchelleCode = newEchelle.getCode();
            if (isEmpty(echelon.getCode())) return ERROR_ECHELLE_CODE_REQUIRED; // echelle code is required

            newEchelle = echelleService.findByCode(newEchelleCode);
            if (newEchelle == null) return ERROR_ECHELLE_NOT_FOUND; // targeted echelle have to exist in database
        } else newEchelle = oldEchelon.getEchelle();

        echelon.setEchelle(newEchelle);
        return 1;
    }
    private int nextEchellonValidate(Echelon oldEchelon, Echelon newEchelon, Echelon echelon) {
        Echelon newNextEchelon = newEchelon.getEchelonSuiv();
        if (newNextEchelon != null) {
            String newNextEchelonCode = newNextEchelon.getCode();
            if (!isEmpty(newNextEchelonCode)) {
                if (newNextEchelonCode.equals(echelon.getCode())) return ERROR_NEXT_EQUAL_CURRENT; // the next echelon code must be different of the current echelon
                newNextEchelon = echelonService.findByCode(newNextEchelonCode);
                if (newNextEchelon == null) return ERROR_NEXT_ECHELON_NOT_FOUND; // the nextEchelon have to exist in database
            }
        } else { // in case the given nextEchelon is null we will take the old one
            Echelon oldNextEchelon = oldEchelon.getEchelonSuiv();
            if (oldNextEchelon != null) newNextEchelon = oldNextEchelon;
        }


        if (newNextEchelon != null) echelon.setEchelonSuiv(newNextEchelon);
        return 1;
    }
    private int prevEchellonValidate(Echelon oldEchelon, Echelon newEchelon, Echelon echelon) {
        Echelon newPrevEchelon = newEchelon.getEchelonSuiv();
        if (newPrevEchelon != null) {
            String newPrevEchelonCode = newPrevEchelon.getCode();
            if (!isEmpty(newPrevEchelonCode)) {
                if (newPrevEchelonCode.equals(echelon.getCode())) return ERROR_PREV_EQUAL_CURRENT;// the Prev echelon code must be different od the current echelon
                newPrevEchelon = echelonService.findByCode(newPrevEchelonCode);
                if (newPrevEchelon == null) return ERROR_PREV_ECHELON_NOT_FOUND; // the prevEchelon have to exist in database
            }
        } else { // in case the given prevEchelon is null we will take the old one
            Echelon oldPrevEchelon = oldEchelon.getEchelonPrec();
            if (oldPrevEchelon != null) newPrevEchelon = oldPrevEchelon;
        }

        if (newPrevEchelon != null) echelon.setEchelonPrec(newPrevEchelon);
        return 1;
    }
    private void updateBaseSalary(Echelon oldEchelon, Echelon newEchelon, Echelon echelon) {
        if (newEchelon.getPrime() != oldEchelon.getPrime()) {
            List<Employee> employes = employeService.findByEchelonCode(echelon.getCode());
            for (Employee employe: employes) {
                employe.setSalaireBase(newEchelon.getPrime());
                employeService.update(employe);
            }
        }
    }

    private final EchelonService echelonService;
    private final EchelleService echelleService;
    private final EmployeService employeService;
}

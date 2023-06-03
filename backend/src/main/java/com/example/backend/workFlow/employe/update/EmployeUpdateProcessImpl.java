package com.example.employee.workFlow.employe.update;

import com.example.employee.bean.Echelon;
import com.example.employee.bean.Employee;
import com.example.employee.bean.EntiteAdministratif;
import com.example.employee.service.facade.EchelonService;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.service.facade.EntiteAdministarifService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.IsEmptyString.isEmpty;

@RequiredArgsConstructor
public class EmployeUpdateProcessImpl implements EmployeUpdateProcess{
    private static final int ERROR_OLD_CIN_REQUIRED = -1;
    private static final int ERROR_NEW_CIN_USED = -2;
    private static final int ERROR_OLD_EMPLOYEE_NOT_FOUND = -3;
    private static final int ERROR_ECHELON_NOT_FOUND = -4;
    private static final int ERROR_ENTITE_NOT_FOUND = -5;

    @Override
    public int run(String oldCin, Employee newEmploye) {
        if (isEmpty(oldCin)) return ERROR_OLD_CIN_REQUIRED; // old cin is required

        String newCin = getNewCin(oldCin, newEmploye);
        if (newCin == null) return ERROR_NEW_CIN_USED;

        // we will change properties of this object to given properties.
        Employee oldEmploye = employeService.findByCin(oldCin);
        if (oldEmploye == null) return ERROR_OLD_EMPLOYEE_NOT_FOUND;

        updateCin(oldEmploye,newCin);

        int result = updateEchelon(oldEmploye,newEmploye.getEchelon());
        if (result != 1) return result;

        result = updateEntite(oldEmploye,newEmploye.getEntiteAdministratif());
        if (result != 1) return result;

        updateOtherProp(oldEmploye,newEmploye);

        employeService.update(oldEmploye);
        return 1;
    }

    private String getNewCin(String oldCin, Employee newEmploye) {
        String newCin = newEmploye.getCin();
        if (isEmpty(newCin)) {
            return oldCin;
        } else if (!newCin.equals(oldCin)) {
            Employee employee = employeService.findByCin(newCin);
            if (employee != null) return null;
        }
        return newCin;
    }

    private void updateCin(Employee oldEmploye, String newCin) {
        if (!newCin.equals(oldEmploye.getCin())) {
            boolean isCinUsed = employeService.existsByCin(newCin);
            if (!isCinUsed) {
                oldEmploye.setCin(newCin);
            }
        }
    }

    private int updateEchelon(Employee oldEmploye, Echelon newEchelon) {
        int result = 1;
        Echelon oldEchelon = oldEmploye.getEchelon();
        if (newEchelon != null && (oldEchelon == null || !newEchelon.getCode().equals(oldEchelon.getCode()))) {

            newEchelon = echelonService.findByCode(newEchelon.getCode());
            if (newEchelon == null) result = ERROR_ECHELON_NOT_FOUND;
            else {
                oldEmploye.setEchelon(newEchelon);
                oldEmploye.setSalaireBase(newEchelon.getPrime());
            }
        }
        return result;
    }

    private int updateEntite(Employee oldEmploye,EntiteAdministratif newEntite) {
        int result = 1;

        EntiteAdministratif oldEntite = oldEmploye.getEntiteAdministratif();
        if (newEntite !=  null && (!newEntite.getCode().equals(oldEntite.getCode()))) {

            newEntite = entiteAdministarifService.findByCode(newEntite.getCode());
            if (newEntite == null)  result = ERROR_ENTITE_NOT_FOUND;
            else {
                // decrement number of members in old entite
                entiteAdministarifService.updateMembersNum(oldEntite, -1);
                // increment number of members in new entite
                entiteAdministarifService.updateMembersNum(newEntite, 1);
                // update employee entite
                oldEmploye.setEntiteAdministratif(newEntite);
            }
        }
        return result;
    }

    private void updateOtherProp(Employee oldEmploye, Employee newEmploye) {
        if (!isEmpty(newEmploye.getNom())) {
            oldEmploye.setNom(newEmploye.getNom());
        }
        if (!isEmpty(newEmploye.getPrenom())) {
            oldEmploye.setPrenom(newEmploye.getPrenom());
        }
        if (!isEmpty(newEmploye.getEmail())) {
            oldEmploye.setEmail(newEmploye.getEmail());
        }
        if (!isEmpty(newEmploye.getPhone())) {
            oldEmploye.setPhone(newEmploye.getPhone());
        }
    }

    private final EmployeService employeService;
    private final EchelonService echelonService;
    private final EntiteAdministarifService entiteAdministarifService;
}

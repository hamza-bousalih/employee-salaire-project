package com.example.employee.workFlow.echelle.update;

import com.example.employee.bean.Echelle;
import com.example.employee.bean.Grade;
import com.example.employee.service.facade.EchelleService;
import com.example.employee.service.facade.GradeService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.IsEmptyString.isEmpty;

@RequiredArgsConstructor
public class EchelleUpdateProcessImpl implements EchelleUpdateProcess {
    private static final int ERROR_CODE_REQUIRED = -1;
    private static final int ERROR_ECHELLE_NOT_FOUND = -2;
    private static final int ERROR_GRADE_CODE_REQUIRED = -3;
    private static final int ERROR_GRADE_NOT_FOUND = -4;
    @Override
    public int run(Echelle echelle) {

        String code = echelle.getCode();
        if (isEmpty(code))  return ERROR_CODE_REQUIRED; // the code is required

        Echelle echelleDB = echelleService.findByCode(code);
        if (echelleDB == null) return ERROR_ECHELLE_NOT_FOUND; // target echelle does not exist

        if (!isEmpty(echelle.getLibelle()))
            echelleDB.setLibelle(echelle.getLibelle());

        int result = updateGrade(echelle,echelleDB);
        if (result < 0) return result;

        echelleService.edit(echelleDB);
        return 1;
    }
    private int updateGrade(Echelle echelle, Echelle echelleDB) {
        Grade givenGrade = echelle.getGrade();
        if (givenGrade != null) {
            String gradeCode = givenGrade.getCode();
            if (isEmpty(gradeCode)) return ERROR_GRADE_CODE_REQUIRED; // grade code is required

            Grade gradeDB = gradeService.findByCode(gradeCode);
            if (gradeDB == null) return ERROR_GRADE_NOT_FOUND; // the given grade does not exist

            echelleDB.setGrade(gradeDB);
        }
        return 1;
    }

    private final EchelleService echelleService;
    private final GradeService gradeService;
}

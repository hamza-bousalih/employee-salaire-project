package com.example.employee.workFlow.echelle.save;

import com.example.employee.bean.Echelle;
import com.example.employee.bean.Grade;
import com.example.employee.service.facade.EchelleService;
import com.example.employee.service.facade.GradeService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.CodeGenerator.generateCode;
import static com.example.employee.shared.IsEmptyString.isEmpty;

@RequiredArgsConstructor
public class EchelleSaveProcessImpl implements EchelleSaveProcess {
    private static final int ERROR_LIBELLE_REQUIRED = -1;
    private static final int ERROR_GRADE_REQUIRED = -2;
    private static final int ERROR_GRADE_CODE_REQUIRED = -3;
    private static final int ERROR_GRADE_NOT_FOUND = -4;
    @Override
    public int run(Echelle echelle) {
        echelle.setCode(generateCode("e"));

        if (isEmpty(echelle.getLibelle())) return ERROR_LIBELLE_REQUIRED; // libelle is required

        Grade givenGrade = echelle.getGrade();
        if (givenGrade == null) return ERROR_GRADE_REQUIRED; // grade is required
        if (isEmpty(givenGrade.getCode())) return ERROR_GRADE_CODE_REQUIRED; // grade code is required

        Grade grade = gradeService.findByCode(givenGrade.getCode());
        if (grade == null) return ERROR_GRADE_NOT_FOUND; // grade have to exist in database

        echelle.setGrade(grade);

        echelleService.create(echelle);
        return 1;
    }

    private final EchelleService echelleService;
    private final GradeService gradeService;
}

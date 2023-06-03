package com.example.employee.workFlow.grade.update;

import com.example.employee.bean.Grade;
import com.example.employee.service.facade.GradeService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.IsEmptyString.isEmpty;

@RequiredArgsConstructor
public class GradeUpdateProcessImpl implements GradeUpdateProcess {
    @Override
    public int run(Grade newGrade) {
        String code = newGrade.getCode();
        if (isEmpty(code)) return -1; // grad's code is required

        Grade oldGrad = gradeService.findByCode(code);
        if (oldGrad == null) return -2; // targeted grad have to be in database

        String libelle = newGrade.getLibelle();
        if (!libelle.isBlank()) {
            oldGrad.setLibelle(libelle);
            gradeService.edit(oldGrad);
        }
        return 1;
    }

    private final GradeService gradeService;
}

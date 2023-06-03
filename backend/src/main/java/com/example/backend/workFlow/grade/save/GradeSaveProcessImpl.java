package com.example.employee.workFlow.grade.save;

import com.example.employee.bean.Grade;
import com.example.employee.service.facade.GradeService;
import lombok.RequiredArgsConstructor;

import static com.example.employee.shared.CodeGenerator.generateCode;
import static com.example.employee.shared.IsEmptyString.isEmpty;

@RequiredArgsConstructor
public class GradeSaveProcessImpl implements GradeSaveProcess {
    @Override
    public int run(Grade grade) {
        grade.setCode(generateCode("g"));

        if (isEmpty(grade.getLibelle())) return -1; // libelle is required

        gradeService.create(grade);
        return 1;
    }

    private final GradeService gradeService;
}

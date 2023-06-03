package com.example.employee.ws.converter;

import com.example.employee.bean.Grade;
import com.example.employee.ws.dto.GradeDto;
import org.springframework.stereotype.Component;

@Component
public class GradeConverter extends AbstractConverter<Grade, GradeDto> {
    @Override
    public GradeDto toDto(Grade grade) {
        GradeDto gradeDto = null;
        if (grade != null) {
            gradeDto = new GradeDto();
            gradeDto.setId(grade.getId());
            gradeDto.setCode(grade.getCode());
            gradeDto.setLibelle(grade.getLibelle());
        }
        return gradeDto;
    }

    @Override
    public Grade toItem(GradeDto gradeDto) {
        Grade grade = null;
        if (gradeDto != null) {
            grade = new Grade();
            grade.setId(gradeDto.getId());
            grade.setCode(gradeDto.getCode());
            grade.setLibelle(gradeDto.getLibelle());
        }
        return grade;
    }
}

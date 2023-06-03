package com.example.employee.ws.facade;

import com.example.employee.bean.Grade;
import com.example.employee.service.facade.GradeService;
import com.example.employee.workFlow.grade.delete.GradeDeleteProcess;
import com.example.employee.workFlow.grade.save.GradeSaveProcess;
import com.example.employee.workFlow.grade.update.GradeUpdateProcess;
import com.example.employee.ws.converter.GradeConverter;
import com.example.employee.ws.dto.GradeDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/grade")
@RequiredArgsConstructor
public class GradeRest {

    @GetMapping("/code/{code}")
    public GradeDto findByCode(@PathVariable String code) {
        Grade grade = gradeService.findByCode(code);
        return gradeConverter.toDto(grade);
    }

    @DeleteMapping("/code/{code}")
    @Transactional
    public int delete(@PathVariable String code) {
        return gradeDeleteProcess.run(code);
    }

    @GetMapping("/")
    public List<GradeDto> findAll() {
        List<Grade> grades = gradeService.findAll();
        return gradeConverter.toDto(grades);
    }

    @PostMapping("/")
    public int save(@RequestBody GradeDto gradeDto) {
        Grade grade = gradeConverter.toItem(gradeDto);
        return gradeSaveProcess.run(grade);
    }

    @PutMapping("/")
    public int update(@RequestBody GradeDto newGradeDto) {
        Grade newGrade = gradeConverter.toItem(newGradeDto);
        return gradeUpdateProcess.run(newGrade);
    }


    private final GradeService gradeService;
    private final GradeSaveProcess gradeSaveProcess;
    private final GradeUpdateProcess gradeUpdateProcess;
    private final GradeDeleteProcess gradeDeleteProcess;
    private final GradeConverter gradeConverter;
}

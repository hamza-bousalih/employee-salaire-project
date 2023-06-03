package com.example.employee.workFlow.grade.delete;

import com.example.employee.bean.Echelle;
import com.example.employee.service.facade.EchelleService;
import com.example.employee.service.facade.GradeService;
import com.example.employee.workFlow.echelle.delete.EchelleDeleteProcess;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class GradeDeleteProcessImpl implements GradeDeleteProcess {
    @Override
    public int run(String code) {
        int totalDeleted = 0;

        if (!gradeService.existsByCode(code)) return -1; // no grade to delete

        List<Echelle> echelles = echelleService.findByGradeCode(code);
        if (echelles != null) {
            for (Echelle echelle: echelles) {
                totalDeleted += echelleDeleteProcess.run(echelle.getCode());
            }
        }

        totalDeleted += gradeService.deleteByCode(code);

        return totalDeleted;
    }

    private final GradeService gradeService;
    private final EchelleService echelleService;
    private final EchelleDeleteProcess echelleDeleteProcess;
}

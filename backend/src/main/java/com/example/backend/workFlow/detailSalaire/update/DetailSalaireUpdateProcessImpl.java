package com.example.employee.workFlow.detailSalaire.update;

import com.example.employee.bean.DetailSalaire;
import com.example.employee.service.facade.DetailSalaireService;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;


@RequiredArgsConstructor
public class DetailSalaireUpdateProcessImpl implements DetailSalaireUpdateProcess {
    @Override
    public int run(DetailSalaire newDetailSalaire) {

        String employeeCin = newDetailSalaire.getEmployee().getCin();
        LocalDate month = newDetailSalaire.getMonth();
        DetailSalaire detailSalaireDB = detailSalaireService
                .findByEmployeeCinAndMonth(employeeCin, month);
        if (detailSalaireDB == null) return -1;

        newDetailSalaire.setId(detailSalaireDB.getId());

        detailSalaireService.save(newDetailSalaire);
        return 1;
    }

    private final DetailSalaireService detailSalaireService;
}

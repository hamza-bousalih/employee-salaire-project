package com.example.employee.workFlow.echelle.delete;

import com.example.employee.bean.Echelon;
import com.example.employee.service.facade.EchelleService;
import com.example.employee.service.facade.EchelonService;
import com.example.employee.workFlow.echelon.delete.EchelonDeleteProcess;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class EchelleDeleteProcessImpl implements EchelleDeleteProcess {
    @Override
    public int run(String code) {
        int totalDelete = 0;

        if (echelleService.existsByCode(code)) {

            List<Echelon> echelons = echelonService.findByEchelleCode(code);
            if (echelons != null) {
                for (Echelon echelon: echelons) {
                    totalDelete += echelonDeleteProcess.run(echelon.getCode());
                }
            }

            totalDelete += echelleService.deleteByCode(code);
        }

        return totalDelete;
    }

    private final EchelleService echelleService;
    private final EchelonService echelonService;
    private final EchelonDeleteProcess echelonDeleteProcess;
}

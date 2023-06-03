package com.example.employee.ws.facade;

import com.example.employee.bean.EntiteAdministratif;
import com.example.employee.service.facade.EntiteAdministarifService;
import com.example.employee.workFlow.entiteAdministarif.delete.EntiteAdministarifDeleteProcess;
import com.example.employee.workFlow.entiteAdministarif.save.EntiteAdministarifSaveProcess;
import com.example.employee.workFlow.entiteAdministarif.update.EntiteAdministarifUpdateProcess;
import com.example.employee.ws.converter.EchelonConverter;
import com.example.employee.ws.converter.EmployeeConverter;
import com.example.employee.ws.converter.EntiteAdministratifConverter;
import com.example.employee.ws.dto.EntiteAdministratifDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/entiteAdministratif")
@RequiredArgsConstructor
public class EntiteAdministratifRest {
    @GetMapping("/code/{code}")
    public EntiteAdministratifDto findByCode(@PathVariable String code) {
        entitieAdminConverter.setAddChef(true);
        employeeConverter.setAddEntite(false);
        echelonConverter.setTime(2); // to ignore the next & prev echelons

        EntiteAdministratif entiteAdministarif = entiteService.findByCode(code);
        return entitieAdminConverter.toDto(entiteAdministarif);
    }

    @Transactional
    @DeleteMapping("/code/{code}/force/{force}")
    public int deleteByCode(@PathVariable String code, @PathVariable boolean force) {
        return entiteAdministarifDeleteProcess.run(code,force);
    }

    @GetMapping("/")
    public List<EntiteAdministratifDto> findAll() {
        entitieAdminConverter.setAddChef(true);
        employeeConverter.setAddEntite(false);
        echelonConverter.setTime(2); // to ignore the next & prev echelons

        List<EntiteAdministratif> entiteAdministarifs = entiteService.findAll();
        return entitieAdminConverter.toDto(entiteAdministarifs);
    }

    @PostMapping("/")
    public int save(@RequestBody EntiteAdministratifDto entiteAdministarifDto) {
        EntiteAdministratif entiteAdministarif = entitieAdminConverter.toItem(entiteAdministarifDto);
        return entiteAdministarifSaveProcess.run(entiteAdministarif);
    }

    @PutMapping("/")
    public int update(@RequestBody EntiteAdministratifDto newEntiteAdminDto) {
        EntiteAdministratif newEntiteAdmin =
                entitieAdminConverter.toItem(newEntiteAdminDto);
        return entiteAdministarifUpdateProcess.run(newEntiteAdmin);
    }

    private final EntiteAdministarifService entiteService;
    private final EntiteAdministratifConverter entitieAdminConverter;
    private final EntiteAdministarifSaveProcess entiteAdministarifSaveProcess;
    private final EntiteAdministarifUpdateProcess entiteAdministarifUpdateProcess;
    private final EntiteAdministarifDeleteProcess entiteAdministarifDeleteProcess;
    private final EmployeeConverter employeeConverter;
    private final EchelonConverter echelonConverter;
}

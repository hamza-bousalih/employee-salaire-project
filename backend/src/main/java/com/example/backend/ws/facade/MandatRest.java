package com.example.employee.ws.facade;

import com.example.employee.bean.Mandat;
import com.example.employee.service.facade.MandatService;
import com.example.employee.workFlow.mandat.save.MandatSaveProcess;
import com.example.employee.workFlow.mandat.update.MandatUpdateProcess;
import com.example.employee.ws.converter.MandatConverter;
import com.example.employee.ws.dto.MandatDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/mandat")
@RequiredArgsConstructor
public class MandatRest {
    private final MandatService mandatService;
    private final MandatConverter mandatConverter;
    private final MandatUpdateProcess mandatUpdateProcess;
    private final MandatSaveProcess mandatSaveProcess;
    @GetMapping("/code/{code}")
    public MandatDto findByCode(@PathVariable String code) {
        mandatConverter.setAddEmployee(true);
        Mandat mandat = mandatService.findByCode(code);
        return mandatConverter.toDto(mandat);
    }

    @Transactional
    @DeleteMapping("/code/{code}")
    public int deleteByCode(@PathVariable String code) {
        return mandatService.deleteByCode(code);
    }

    @GetMapping("/employee/cin/{cin}")
    public List<MandatDto> findByEmployeeCin(@PathVariable String cin) {
        mandatConverter.setAddEmployee(false);
        List<Mandat> mandats = mandatService.findByEmployeeCin(cin);
        return mandatConverter.toDto(mandats);
    }

    @Transactional
    @DeleteMapping("/employee/cin/{cin}")
    public int deleteByEmployeeCin(@PathVariable String cin) {
        return mandatService.deleteByEmployeeCin(cin);
    }

    @GetMapping("/")
    public List<MandatDto> findAll() {
        mandatConverter.setAddEmployee(false);
        List<Mandat> mandats = mandatService.findAll();
        return mandatConverter.toDto(mandats);
    }

    @PostMapping("/")
    public int save(@RequestBody MandatDto mandatDto) {
        Mandat mandat = mandatConverter.toItem(mandatDto);
        return mandatSaveProcess.run(mandat);
    }

    @GetMapping("/code/{code}/date/{date}")
    public List<Mandat> findMandatByRespCodeAndEndDate(
            @PathVariable String code,@PathVariable LocalDate date) {
        mandatConverter.setAddEmployee(false);
        return mandatService.
                findMandatByRespCodeAndEndDate(code, date);
    }

    @PutMapping("/")
    public int update(@RequestBody MandatDto newMandatDto) {
        Mandat newMandat = mandatConverter.toItem(newMandatDto);
        return mandatUpdateProcess.run(newMandat);
    }

    @PutMapping("/id/{id}/prime/{prime}")
    public int updatePrime(@PathVariable Long id,@PathVariable double prime) {
        return mandatService.updatePrime(id, prime);
    }
}

package com.example.employee.ws.facade;

import com.example.employee.bean.DetailSalaire;
import com.example.employee.service.facade.DetailSalaireService;
import com.example.employee.workFlow.detailSalaire.calcSalary.CalcSalaryProcess;
import com.example.employee.workFlow.detailSalaire.save.DetailSalaireSaveProcess;
import com.example.employee.ws.converter.DetailSalaireConverter;
import com.example.employee.ws.dto.DetailSalaireDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@RestController
@RequestMapping("/api/v1/detailSalaire")
public class DetailSalaireRest {
    @GetMapping("/code/{code}")
    public DetailSalaire findByCode(@PathVariable String code) {
        return detailSalaireService.findByCode(code);
    }

    @Transactional
    @DeleteMapping("/code/{code}")
    public int deleteByCode(@PathVariable String code) {
        return detailSalaireService.deleteByCode(code);
    }

    @GetMapping("/employee/cin/{cin}")
    public List<DetailSalaireDto> findByEmployeeCin(@PathVariable String cin) {
        List<DetailSalaire> detailSalaire = detailSalaireService.findByEmployeeCin(cin);
        return detailSalaireConverter.toDto(detailSalaire);
    }

    @GetMapping("/month/{month}")
    public List<DetailSalaireDto> findByMonth(@PathVariable LocalDate month) {
        List<DetailSalaire> detailSalaires = detailSalaireService.findByMonth(month);
        return detailSalaireConverter.toDto(detailSalaires);
    }

    @Transactional
    @DeleteMapping("/employee/cin/{cin}")
    public int deleteByEmployeeCin(@PathVariable String cin) {
        return detailSalaireService.deleteByEmployeeCin(cin);
    }

    @GetMapping("/")
    public List<DetailSalaireDto> findAll() {
        List<DetailSalaire> detailSalaires = detailSalaireService.findAll();
        return detailSalaireConverter.toDto(detailSalaires);
    }

    @PostMapping("/")
    public int save(@RequestBody DetailSalaireDto detailSalaireDto) {
        DetailSalaire detailSalaire = detailSalaireConverter.toItem(detailSalaireDto);
        return detailSalaireSaveProcess.run(detailSalaire);
    }

    @PostMapping("/calcSalary/month/{month}")
    public int calcSalary(@PathVariable String month,@RequestBody DetailSalaireDto detailSalaireDto) {
        return calcSalaryProcess.run(month);
    }

    @Autowired private DetailSalaireService detailSalaireService;
    @Autowired private DetailSalaireConverter detailSalaireConverter;
    @Autowired private DetailSalaireSaveProcess detailSalaireSaveProcess;
    @Autowired private CalcSalaryProcess calcSalaryProcess;
}

package com.example.employee.ws.facade;

import com.example.employee.bean.Echelon;
import com.example.employee.service.facade.EchelonService;
import com.example.employee.workFlow.echelon.save.EchelonSaveProcess;
import com.example.employee.workFlow.echelon.update.EchelonUpdateProcess;
import com.example.employee.ws.converter.EchelonConverter;
import com.example.employee.ws.dto.EchelonDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/echelon")
public class EchelonRest {
    @GetMapping("/code/{code}")
    public EchelonDto findByCode(@PathVariable String code) {
        Echelon echelon = echelonService.findByCode(code);
        echelonConverter.setTime(1);
        return echelonConverter.toDto(echelon);
    }

    @DeleteMapping("/code/{code}")
    @Transactional
    public int deleteByCode(@PathVariable String code) {
        return echelonService.deleteByCode(code);
    }

    @GetMapping("/")
    public List<EchelonDto> findAll() {
        List<Echelon> echelons = echelonService.findAll();
        echelonConverter.setTime(1);
        return echelonConverter.toDto(echelons);
    }

    @PostMapping("/")
    public int save(@RequestBody EchelonDto echelonDto){
        Echelon echelon = echelonConverter.toItem(echelonDto);
        return echelonSaveProcess.run(echelon);
    }

    @PutMapping("/")
    public int update(@RequestBody EchelonDto newEchelonDto) {
        Echelon newEchelon = echelonConverter.toItem(newEchelonDto);
        return echelonUpdateProcess.run(newEchelon);
    }

    @Autowired private EchelonService echelonService;
    @Autowired private EchelonConverter echelonConverter;
    @Autowired private EchelonSaveProcess echelonSaveProcess;
    @Autowired private EchelonUpdateProcess echelonUpdateProcess;

}

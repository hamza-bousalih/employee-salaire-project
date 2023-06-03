package com.example.employee.ws.facade;

import com.example.employee.bean.Echelle;
import com.example.employee.service.facade.EchelleService;
import com.example.employee.workFlow.echelle.delete.EchelleDeleteProcess;
import com.example.employee.workFlow.echelle.save.EchelleSaveProcess;
import com.example.employee.workFlow.echelle.update.EchelleUpdateProcess;
import com.example.employee.ws.converter.EchelleConverter;
import com.example.employee.ws.dto.EchelleDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/echelle")
@RequiredArgsConstructor
public class EchelleRest {
    @GetMapping("/code/{code}")
    public EchelleDto findByCode(@PathVariable String code) {
        Echelle echelle = echelleService.findByCode(code);
        return echelleConverter.toDto(echelle);
    }

    @DeleteMapping("/code/{code}")
    @Transactional
        public int delete(@PathVariable String code) {
        return echelleDeleteProcess.run(code);
    }

    @GetMapping("/")
    public List<EchelleDto> findAll() {
        List<Echelle> echelles = echelleService.findAll();
        return echelleConverter.toDto(echelles);
    }

    @PostMapping("/")
    public int save(@RequestBody EchelleDto echelleDto) {
        Echelle echelle = echelleConverter.toItem(echelleDto);
        return echelleSaveProcess.run(echelle);
    }

    @PutMapping("/")
    public int update(@RequestBody EchelleDto echelleDto) {
        Echelle echelle = echelleConverter.toItem(echelleDto);
        return echelleUpdateProcess.run(echelle);
    }

    private final EchelleService echelleService;
    private final EchelleConverter echelleConverter;
    private final EchelleSaveProcess echelleSaveProcess;
    private final EchelleUpdateProcess echelleUpdateProcess;
    private final EchelleDeleteProcess echelleDeleteProcess;
}

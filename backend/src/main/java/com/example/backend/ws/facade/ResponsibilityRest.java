package com.example.employee.ws.facade;

import com.example.employee.bean.Responsibility;
import com.example.employee.service.facade.ResponsibilityService;
import com.example.employee.workFlow.responsibility.save.ResponsibilitySaveProcess;
import com.example.employee.workFlow.responsibility.update.ResponsibilityUpdateProcess;
import com.example.employee.ws.converter.ResponsibilityConverter;
import com.example.employee.ws.dto.ResponsibilityDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/responsibility")
@RequiredArgsConstructor
public class ResponsibilityRest {
    private final ResponsibilityService responsibilityService;
    private final ResponsibilityConverter responsibilityConverter;
    private final ResponsibilityUpdateProcess responsibilityUpdateProcess;
    private final ResponsibilitySaveProcess responsibilitySaveProcess;

    @GetMapping("/code/{code}")
    public ResponsibilityDto findByCode(@PathVariable String code) {
        Responsibility responsibility = responsibilityService.findByCode(code);
        return responsibilityConverter.toDto(responsibility);
    }

    @DeleteMapping("/code/{code}")
    @Transactional
    public int deleteByCode(@PathVariable String code) {
        return responsibilityService.deleteByCode(code);
    }

    @GetMapping("/")
    public List<ResponsibilityDto> findAll() {
        List<Responsibility> responsibilities = responsibilityService.findAll();
        return responsibilityConverter.toDto(responsibilities);
    }

    @PostMapping("/")
    public int save(@RequestBody ResponsibilityDto responsibilityDto) {
        Responsibility responsibility = responsibilityConverter.toItem(responsibilityDto);
        return responsibilitySaveProcess.run(responsibility);
    }

    @PutMapping("/")
    public int update(@RequestBody ResponsibilityDto responsibilityDto) {
        Responsibility responsibility =
                responsibilityConverter.toItem(responsibilityDto);
        return responsibilityUpdateProcess.run(responsibility);
    }
}

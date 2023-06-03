package com.example.employee.ws.facade;

import com.example.employee.bean.Employee;
import com.example.employee.service.facade.EmployeService;
import com.example.employee.workFlow.employe.delete.EmployeDeleteProcess;
import com.example.employee.workFlow.employe.save.EmployeSaveProcess;
import com.example.employee.workFlow.employe.update.EmployeUpdateProcess;
import com.example.employee.ws.converter.EchelonConverter;
import com.example.employee.ws.converter.EmployeeConverter;
import com.example.employee.ws.converter.EntiteAdministratifConverter;
import com.example.employee.ws.dto.EmployeDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/employee")
public class EmployeeRest {
    @GetMapping("/")
    public List<EmployeDto> findAll() {
        List<Employee> employes = employeService.findAll();
        entiteAdministratifConverter.setAddChef(false);
        employeeConverter.setAddEntite(true);
        echelonConverter.setTime(2); // to ignore the next & prev echelons

        return employeeConverter.toDto(employes);
    }

    @GetMapping("/entiteAdministratif/code/{code}")
    public List<EmployeDto> findByEntite(@PathVariable String code) {
        List<Employee> employes = employeService.findByEntiteCode(code);
        entiteAdministratifConverter.setAddChef(false);
        employeeConverter.setAddEntite(true);
        echelonConverter.setTime(2); // to ignore the next & prev echelons

        return employeeConverter.toDto(employes);
    }

    @GetMapping("/cin/{cin}")
    public EmployeDto findByCin(@PathVariable String cin) {
        Employee employe = employeService.findByCin(cin);
        entiteAdministratifConverter.setAddChef(false);
        employeeConverter.setAddEntite(true);
        echelonConverter.setTime(2); // to ignore the next & prev echelons

        return employeeConverter.toDto(employe);
    }

    @Transactional
    @DeleteMapping("/cin/{cin}/raison/{raison}")
    public int deleteByCin(@PathVariable String cin, @PathVariable String raison) {
        return employeDeleteProcess.run(cin, raison);
    }

    @PostMapping("/")
    public int save(@RequestBody EmployeDto employeDto) {
        Employee employe= employeeConverter.toItem(employeDto);
        return employeSaveProcess.run(employe);
    }

    @PutMapping("/cin/{cin}")
    public int update(@RequestBody EmployeDto employeDto, @PathVariable String cin) {
        Employee employe = employeeConverter.toItem(employeDto);
        return employeUpdateProcess.run(cin,employe);
    }

    @Autowired private EmployeService employeService;
    @Autowired private EmployeeConverter employeeConverter;
    @Autowired private EmployeSaveProcess employeSaveProcess;
    @Autowired private EmployeUpdateProcess employeUpdateProcess;
    @Autowired private EmployeDeleteProcess employeDeleteProcess;
    @Autowired private EntiteAdministratifConverter entiteAdministratifConverter;
    @Autowired private EchelonConverter echelonConverter;

}

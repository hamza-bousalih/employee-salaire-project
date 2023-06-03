package com.example.employee.ws.facade;

import com.example.employee.bean.EmployeArchive;
import com.example.employee.service.facade.EmployeArchiveService;
import com.example.employee.ws.converter.EmployeArchiveConverter;
import com.example.employee.ws.dto.EmployeArchiveDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/employeeArchive")
public class EmployeArchiveRest {
    @DeleteMapping("/cin/{cin}")
    @Transactional
    public int deleteByCin(@PathVariable String cin) {
        return employeArchiveService.deleteByCin(cin);
    }

    @DeleteMapping("/code/{code}")
    @Transactional
    public int deleteByCode(@PathVariable String code) {
        return employeArchiveService.deleteByCode(code);
    }

    @DeleteMapping("/")
    @Transactional
    public int multiDelete(@RequestBody List<String> cins) {
        return employeArchiveService.multiDelete(cins);
    }

    @GetMapping("/")
    public List<EmployeArchiveDto> findAll() {
        List<EmployeArchive> archives = employeArchiveService.findAll();
        return employeArchiveConverter.toDto(archives);
    }

    @GetMapping("/cin/{cin}")
    public List<EmployeArchiveDto> findAllByCin(@PathVariable String cin) {
        List<EmployeArchive> employeeArchives = employeArchiveService.findAllByCin(cin);
        return employeArchiveConverter.toDto(employeeArchives);
    }

    @PostMapping("/")
    public int save(EmployeArchiveDto employeArchiveDto) {
        EmployeArchive employeArchive = employeArchiveConverter.toItem(employeArchiveDto);
        return employeArchiveService.save(employeArchive);
    }

    @Autowired private EmployeArchiveService employeArchiveService;
    @Autowired private EmployeArchiveConverter employeArchiveConverter;
}

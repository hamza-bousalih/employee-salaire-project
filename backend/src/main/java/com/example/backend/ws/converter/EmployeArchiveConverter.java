package com.example.employee.ws.converter;

import com.example.employee.bean.EmployeArchive;
import com.example.employee.ws.dto.EmployeArchiveDto;
import org.springframework.stereotype.Component;

@Component
public class EmployeArchiveConverter extends AbstractConverter<EmployeArchive, EmployeArchiveDto>{
    @Override
    public EmployeArchiveDto toDto(EmployeArchive employee) {
        EmployeArchiveDto employeeDto = null;
        if (employee != null) {
            employeeDto = new EmployeArchiveDto();
            employeeDto.setId(employee.getId());
            employeeDto.setCin(employee.getCin());
            employeeDto.setCode(employee.getCode());
            employeeDto.setNom(employee.getNom());
            employeeDto.setPrenom(employee.getPrenom());
            employeeDto.setDeleteRaison(employee.getDeleteRaison());
            employeeDto.setDeleteDate(employee.getDeleteDate());
        }
        return employeeDto;
    }

    @Override
    public EmployeArchive toItem(EmployeArchiveDto employeeDto) {
        EmployeArchive employee = null;
        if (employeeDto != null) {
            employee = new EmployeArchive();
            employee.setId(employeeDto.getId());
            employee.setCin(employeeDto.getCin());
            employee.setCode(employeeDto.getCode());
            employee.setNom(employeeDto.getNom());
            employee.setPrenom(employeeDto.getPrenom());
            employee.setDeleteRaison(employeeDto.getDeleteRaison());
            employee.setDeleteDate(employeeDto.getDeleteDate());
        }
        return employee;
    }
}

package com.example.employee.ws.converter;

import com.example.employee.bean.Employee;
import com.example.employee.ws.dto.EmployeDto;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Setter
@Component
public class EmployeeConverter extends AbstractConverter<Employee, EmployeDto> {
    private boolean addEntite;
    @Override
    public EmployeDto toDto(Employee employee) {
        EmployeDto employeeDto = null;
        if (employee != null) {
            employeeDto = new EmployeDto();
            employeeDto.setId(employee.getId());
            employeeDto.setCin(employee.getCin());
            employeeDto.setNom(employee.getNom());
            employeeDto.setPrenom(employee.getPrenom());
            employeeDto.setNumMois(employee.getNumMois());
            employeeDto.setEmail(employee.getEmail());
            employeeDto.setPhone(employee.getPhone());
            employeeDto.setSalaireBase(employee.getSalaireBase());
            employeeDto.setEchelon(echelonConverter.toDto(employee.getEchelon()));
            if (addEntite)
                employeeDto.setEntiteAdministratif(entitieAdminConverter.toDto(employee.getEntiteAdministratif()));
        }
        return employeeDto;
    }

    @Override
    public Employee toItem(EmployeDto employeeDto) {
        Employee employee = null;
        if (employeeDto != null) {
            employee = new Employee();
            employee.setId(employeeDto.getId());
            employee.setCin(employeeDto.getCin());
            employee.setNom(employeeDto.getNom());
            employee.setPrenom(employeeDto.getPrenom());
            employee.setEmail(employeeDto.getEmail());
            employee.setPhone(employeeDto.getPhone());
            employee.setNumMois(employeeDto.getNumMois());
            employee.setSalaireBase(employeeDto.getSalaireBase());
            employee.setEchelon(echelonConverter.toItem(employeeDto.getEchelon()));
            employee.setEntiteAdministratif(entitieAdminConverter.toItem(employeeDto.getEntiteAdministratif()));
        }
        return employee;
    }

    @Autowired private EchelonConverter echelonConverter;
    @Autowired private EntiteAdministratifConverter entitieAdminConverter;
}

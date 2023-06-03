package com.example.employee.ws.converter;

import com.example.employee.bean.Mandat;
import com.example.employee.ws.dto.MandatDto;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Setter
public class MandatConverter extends AbstractConverter<Mandat, MandatDto>{
    boolean addEmployee = true;
    @Override
    public MandatDto toDto(Mandat mandat) {
        MandatDto mandatDto = null;
        if (mandat != null) {
            mandatDto = new MandatDto();
            mandatDto.setId(mandat.getId());
            mandatDto.setCode(mandat.getCode());
            mandatDto.setPrime(mandat.getPrime());
            mandatDto.setStartDate(mandat.getStartDate());
            mandatDto.setEndDate(mandat.getEndDate());
            if (addEmployee)
                mandatDto.setEmployee(employeeConverter.toDto(mandat.getEmployee()));
            mandatDto.setResponsibility(responsibilityConverter.toDto(mandat.getResponsibility()));
        }
        return mandatDto;
    }

    @Override
    public Mandat toItem(MandatDto mandatDto) {
        Mandat mandat = null;
        if (mandatDto != null) {
            mandat = new Mandat();
            mandat.setId(mandatDto.getId());
            mandat.setCode(mandatDto.getCode());
            mandat.setPrime(mandatDto.getPrime());
            mandat.setStartDate(mandatDto.getStartDate());
            mandat.setEndDate(mandatDto.getEndDate());
            mandat.setEmployee(employeeConverter.toItem(mandatDto.getEmployee()));
            mandat.setResponsibility(responsibilityConverter.toItem(mandatDto.getResponsibility()));
        }
        return mandat;
    }

    @Autowired private EmployeeConverter employeeConverter;
    @Autowired private ResponsibilityConverter responsibilityConverter;
}

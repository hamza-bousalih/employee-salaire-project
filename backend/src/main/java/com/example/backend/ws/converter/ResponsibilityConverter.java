package com.example.employee.ws.converter;

import com.example.employee.bean.Responsibility;
import com.example.employee.ws.dto.ResponsibilityDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ResponsibilityConverter extends AbstractConverter<Responsibility, ResponsibilityDto>{
    @Override
    public ResponsibilityDto toDto(Responsibility responsibility) {
        ResponsibilityDto responsibilityDto = null;
        if (responsibility != null) {
            responsibilityDto = new ResponsibilityDto();
            responsibilityDto.setId(responsibility.getId());
            responsibilityDto.setCode(responsibility.getCode());
            responsibilityDto.setLibelle(responsibility.getLibelle());
            responsibilityDto.setPrime(responsibility.getPrime());
            responsibilityDto.setEchelon(echellonConverter.toDto(responsibility.getEchelon()));
        }
        return responsibilityDto;
    }

    @Override
    public Responsibility toItem(ResponsibilityDto responsibilityDto) {
        Responsibility responsibility = null;
        if (responsibilityDto != null) {
            responsibility = new Responsibility();
            responsibility.setId(responsibilityDto.getId());
            responsibility.setCode(responsibilityDto.getCode());
            responsibility.setLibelle(responsibilityDto.getLibelle());
            responsibility.setPrime(responsibilityDto.getPrime());
            responsibility.setEchelon(echellonConverter.toItem(responsibilityDto.getEchelon()));
        }
        return responsibility;
    }

    @Autowired private EchelonConverter echellonConverter;
}

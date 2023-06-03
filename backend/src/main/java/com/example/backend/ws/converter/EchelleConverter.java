package com.example.employee.ws.converter;

import com.example.employee.bean.Echelle;
import com.example.employee.ws.dto.EchelleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EchelleConverter extends AbstractConverter<Echelle, EchelleDto> {
    @Override
    public EchelleDto toDto(Echelle echelle) {
        EchelleDto echelleDto = null;
        if (echelle != null) {
            echelleDto =new EchelleDto();
            echelleDto.setId(echelle.getId());
            echelleDto.setCode(echelle.getCode());
            echelleDto.setLibelle(echelle.getLibelle());
            echelleDto.setGrade(gradeConverter.toDto(echelle.getGrade()));
        }
        return echelleDto;
    }

    @Override
    public Echelle toItem(EchelleDto echelleDto) {
        Echelle echelle = null;
        if (echelleDto != null) {
            echelle =new Echelle();
            echelle.setId(echelleDto.getId());
            echelle.setCode(echelleDto.getCode());
            echelle.setLibelle(echelleDto.getLibelle());
            echelle.setGrade(gradeConverter.toItem(echelleDto.getGrade()));
        }
        return echelle;
    }

    @Autowired private GradeConverter gradeConverter;
}

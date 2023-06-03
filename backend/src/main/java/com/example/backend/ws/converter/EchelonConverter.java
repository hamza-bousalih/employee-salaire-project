package com.example.employee.ws.converter;

import com.example.employee.bean.Echelon;
import com.example.employee.ws.dto.EchelonDto;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Setter
public class EchelonConverter extends AbstractConverter<Echelon, EchelonDto> {
    @Autowired private EchelleConverter echelleConverter;

    private int time;

    @Override
    public EchelonDto toDto(Echelon echelon) {
        EchelonDto echelonDto = null;
        if (echelon != null) {
            echelonDto = new EchelonDto();
            echelonDto.setId(echelon.getId());
            echelonDto.setCode(echelon.getCode());
            echelonDto.setLibelle(echelon.getLibelle());
            echelonDto.setDelai(echelon.getDelai());
            echelonDto.setPrime(echelon.getPrime());
            echelonDto.setEchelle(echelleConverter.toDto(echelon.getEchelle()));
            if (this.time <= 1) {
                int i = this.time;
                this.time = ++i;
                echelonDto.setEchelonSuiv(this.toDto(echelon.getEchelonSuiv()));
                echelonDto.setEchelonPrec(this.toDto(echelon.getEchelonPrec()));
            }
        }
        return echelonDto;
    }

    @Override
    public Echelon toItem(EchelonDto echelonDto) {
        Echelon echelon = null;
        if (echelonDto != null) {
            echelon = new Echelon();
            echelon.setId(echelonDto.getId());
            echelon.setCode(echelonDto.getCode());
            echelon.setLibelle(echelonDto.getLibelle());
            echelon.setPrime(echelonDto.getPrime());
            echelon.setDelai(echelonDto.getDelai());
            echelon.setEchelle(echelleConverter.toItem(echelonDto.getEchelle()));
            echelon.setEchelonSuiv(this.toItem(echelonDto.getEchelonSuiv()));
            echelon.setEchelonPrec(this.toItem(echelonDto.getEchelonPrec()));
        }
        return echelon;
    }
}

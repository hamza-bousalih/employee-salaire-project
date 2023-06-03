package com.example.employee.ws.converter;

import com.example.employee.bean.EntiteAdministratif;
import com.example.employee.ws.dto.EntiteAdministratifDto;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Setter
@Component
public class EntiteAdministratifConverter extends AbstractConverter<EntiteAdministratif, EntiteAdministratifDto> {
    private boolean addChef;
    @Override
    public EntiteAdministratifDto toDto(EntiteAdministratif entiteAdministarif) {
        EntiteAdministratifDto entiteAdministarifDto = null;
        if (entiteAdministarif != null) {
            entiteAdministarifDto = new EntiteAdministratifDto();
            entiteAdministarifDto.setId(entiteAdministarif.getId());
            entiteAdministarifDto.setCode(entiteAdministarif.getCode());
            entiteAdministarifDto.setLibelle(entiteAdministarif.getLibelle());
            entiteAdministarifDto.setMembersNum(entiteAdministarif.getMembersNum());
            if (addChef)
                entiteAdministarifDto.setChef(employeeConverter.toDto(entiteAdministarif.getChef()));
        }
        return entiteAdministarifDto;
    }

    @Override
    public EntiteAdministratif toItem(EntiteAdministratifDto entiteAdministarifDto) {
        EntiteAdministratif entiteAdministarif = null;
        if (entiteAdministarifDto != null) {
            entiteAdministarif = new EntiteAdministratif();
            entiteAdministarif.setId(entiteAdministarifDto.getId());
            entiteAdministarif.setCode(entiteAdministarifDto.getCode());
            entiteAdministarif.setLibelle(entiteAdministarifDto.getLibelle());
            entiteAdministarif.setMembersNum(entiteAdministarifDto.getMembersNum());
            entiteAdministarif.setChef(employeeConverter.toItem(entiteAdministarifDto.getChef()));
        }
        return entiteAdministarif;
    }

    @Autowired private EmployeeConverter employeeConverter;
}

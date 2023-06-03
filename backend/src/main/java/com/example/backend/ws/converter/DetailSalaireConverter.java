package com.example.employee.ws.converter;

import com.example.employee.bean.DetailSalaire;
import com.example.employee.ws.dto.DetailSalaireDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DetailSalaireConverter extends AbstractConverter<DetailSalaire, DetailSalaireDto>{

    @Override
    public DetailSalaireDto toDto(DetailSalaire detailSalaire) {
        DetailSalaireDto detailSalaireDto = null;
        if (detailSalaire != null) {
            detailSalaireDto = new DetailSalaireDto();
            detailSalaireDto.setId(detailSalaire.getId());
            detailSalaireDto.setCode(detailSalaire.getCode());
            detailSalaireDto.setMonth(detailSalaire.getMonth());
            detailSalaireDto.setEmployee(employeeConverter.toDto(detailSalaire.getEmployee()));
            detailSalaireDto.setSalaireBase(detailSalaire.getSalaireBase());
            detailSalaireDto.setPrimeGeneral(detailSalaire.getPrimeGeneral());
            detailSalaireDto.setResponsibility(responsibilityConverter.toDto(detailSalaire.getResponsibility()));
            detailSalaireDto.setResponsibilityPrime(detailSalaire.getResponsibilityPrime());
        }
        return detailSalaireDto;
    }

    @Override
    public DetailSalaire toItem(DetailSalaireDto detailSalaireDto) {
        DetailSalaire detailSalaire = null;
        if (detailSalaireDto != null) {
            detailSalaire = new DetailSalaire();
            detailSalaire.setId(detailSalaireDto.getId());
            detailSalaire.setCode(detailSalaireDto.getCode());
            detailSalaire.setMonth(detailSalaireDto.getMonth());
            detailSalaire.setEmployee(employeeConverter.toItem(detailSalaireDto.getEmployee()));
            detailSalaire.setSalaireBase(detailSalaireDto.getSalaireBase());
            detailSalaire.setPrimeGeneral(detailSalaireDto.getPrimeGeneral());
            detailSalaire.setResponsibility(responsibilityConverter.toItem(detailSalaireDto.getResponsibility()));
            detailSalaire.setResponsibilityPrime(detailSalaireDto.getResponsibilityPrime());
        }
        return detailSalaire;
    }

    @Autowired private EmployeeConverter employeeConverter;
    @Autowired private ResponsibilityConverter responsibilityConverter;
}

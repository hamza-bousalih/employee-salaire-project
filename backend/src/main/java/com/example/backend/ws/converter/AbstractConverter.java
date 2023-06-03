package com.example.employee.ws.converter;

import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractConverter<T,DTO> {
    public abstract DTO toDto(T t);
    public abstract T toItem(DTO dto);

    public List<DTO> toDto(List<T> ts) {
        List<DTO> dtos = null;
        if (ts != null) {
            dtos = ts.stream().map(this::toDto).collect(Collectors.toList());
        }
        return dtos;
    }

    public List<T> toItem(List<DTO> dtos) {
        List<T> ts = null;
        if (dtos != null) {
            ts = dtos.stream().map(this::toItem).collect(Collectors.toList());
        }
        return ts;
    }
}

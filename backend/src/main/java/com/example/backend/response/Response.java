package com.example.employee.response;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@ToString
@Getter
public class Response<T> {
    String message;
    int messageCode;
    T data = null;
    LocalDate date = LocalDate.now();

    public Response() {
    }

    public Response(int messageCode) {
        this.messageCode = messageCode;
    }

    public Response(int messageCode, String message) {
        this.message = message;
        this.messageCode = messageCode;
    }

    public Response(int messageCode, T data) {
        this.messageCode = messageCode;
        this.data = data;
    }

    public Response(String message, int messageCode, T data) {
        this.message = message;
        this.messageCode = messageCode;
        this.data = data;
    }

    public Response(String message, int messageCode, T data, LocalDate date) {
        this.message = message;
        this.messageCode = messageCode;
        this.data = data;
        this.date = date;
    }
}

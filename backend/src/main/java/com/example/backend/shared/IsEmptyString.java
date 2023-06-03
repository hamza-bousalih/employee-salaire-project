package com.example.employee.shared;

public class IsEmptyString {
    public static boolean isEmpty(String string) {
        return string == null || string.isBlank();
    }
    private IsEmptyString(){}
}

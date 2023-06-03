package com.example.employee.shared;

import org.springframework.stereotype.Component;

@Component
public class CodeGenerator {
    public static String generateCode(String prefix) {
        long random = System.currentTimeMillis();
        return prefix.toUpperCase() + random;
    }

    private CodeGenerator() {}
}

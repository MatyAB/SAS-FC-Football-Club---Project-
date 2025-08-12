package com.sasfc.api.config; // A good place for this is a 'config' package

import com.sasfc.api.model.enums.PreferredFoot;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component // Make it a Spring bean so it's automatically detected
public class StringToPreferredFootConverter implements Converter<String, PreferredFoot> {

    @Override
    public PreferredFoot convert(String source) {
        if (source == null || source.isEmpty()) {
            return null; // Handle empty or null strings gracefully
        }
        try {
            // Convert the source string to uppercase and then to the enum
            return PreferredFoot.valueOf(source.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            // Handle cases where the string is not a valid enum value
            // You could return null, a default value, or throw a custom exception
            return null; 
        }
    }
}
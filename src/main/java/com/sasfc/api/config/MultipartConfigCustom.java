package com.sasfc.api.config;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

@Configuration
public class MultipartConfigCustom {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        
        // Set max file size to a very large value to avoid it being the limiting factor.
        // The original error was FileCountLimitExceededException, but sometimes large sizes can indirectly cause issues.
        // We'll use 1GB as a very large value.
        factory.setMaxFileSize(DataSize.ofGigabytes(1));
        
        // Set max request size to a very large value.
        factory.setMaxRequestSize(DataSize.ofGigabytes(1));
        
        // The MultipartConfigElement constructor does not have a direct parameter for file count.
        // The FileCountLimitExceededException is thrown by Apache Commons FileUpload.
        // If the issue persists, a more advanced configuration might be needed.
        // For now, we are increasing the size limits as a potential workaround.
        
        return factory.createMultipartConfig();
    }
}

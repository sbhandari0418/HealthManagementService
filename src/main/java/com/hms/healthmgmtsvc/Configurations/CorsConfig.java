package com.hms.healthmgmtsvc.Configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "https://zealous-mushroom-0c05d8a0f.5.azurestaticapps.net", "https://healthmanagementapi.orangewave-663720c0.eastus.azurecontainerapps.io")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .maxAge(3600); // Max age of the pre-flight request in seconds
    }
}

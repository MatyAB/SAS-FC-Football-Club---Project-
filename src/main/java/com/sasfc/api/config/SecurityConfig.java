package com.sasfc.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // This enables Spring's web security support
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF, as we are using a stateless REST API (no sessions)
            .csrf(csrf -> csrf.disable())

            // 2. Set the session management to stateless
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 3. Define the authorization rules for different endpoints
            .authorizeHttpRequests(auth -> auth
                // TEMPORARILY permit all requests to /api/admin/** for testing
                .requestMatchers("/api/admin/**").permitAll() 
                
                // Allow access to Swagger UI without authentication
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                
                // Any other request must be authenticated (this will be the default)
                .anyRequest().authenticated() 
            );

        return http.build();
    }
}
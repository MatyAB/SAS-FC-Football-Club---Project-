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
                .requestMatchers("/api/auth/login").permitAll() // Allow login endpoint
                .requestMatchers("/api/admin/**").permitAll()   // (if you want admin open for now)
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
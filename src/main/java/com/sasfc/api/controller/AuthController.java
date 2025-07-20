package com.sasfc.api.controller;


import com.sasfc.api.dto.LoginRequest;
import com.sasfc.api.dto.LoginResponse;
import com.sasfc.api.dto.UserDto;
import com.sasfc.api.mapper.UserMapper;
import com.sasfc.api.model.User;
import com.sasfc.api.security.JwtUtil;
import com.sasfc.api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.findUserByEmail(loginRequest.getEmail());

            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
                // Passwords match, generate token
                String token = jwtUtil.generateToken(user);                
                // Update last login time
                user.setLastLogin(new Date());
                // Note: a proper implementation would call a method in UserService to save this.
                // For now, this demonstrates the logic.

                UserDto userDto = UserMapper.toUserDto(user);
                LoginResponse response = new LoginResponse(token, userDto);

                return ResponseEntity.ok(response);
            } else {
                // Passwords do not match
                return ResponseEntity.status(401).body("Invalid credentials");
            }

        } catch (Exception e) {
            // User not found
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
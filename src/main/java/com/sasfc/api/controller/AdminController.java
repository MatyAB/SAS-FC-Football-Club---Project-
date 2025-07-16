package com.sasfc.api.controller;

import com.sasfc.api.dto.CreateUserRequest;
import com.sasfc.api.dto.RoleDto;
import com.sasfc.api.dto.UserDto;
import com.sasfc.api.mapper.UserMapper;
import com.sasfc.api.model.User;
import com.sasfc.api.repository.RoleRepository;
import com.sasfc.api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
// @PreAuthorize("hasAuthority('USER_MANAGE')") 
public class AdminController {

    private final UserService userService;
    private final RoleRepository roleRepository;

    @Autowired
    public AdminController(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    // --- User Management Endpoints ---

    @PostMapping("/users/editor")
    public ResponseEntity<UserDto> createEditor(@Valid @RequestBody CreateUserRequest request) {
        User newUser = userService.createUser(request, "ROLE_EDITOR");
        return new ResponseEntity<>(UserMapper.toUserDto(newUser), HttpStatus.CREATED);
    }

    @PostMapping("/users/admin")
    public ResponseEntity<UserDto> createAdmin(@Valid @RequestBody CreateUserRequest request) {
        User newUser = userService.createUser(request, "ROLE_ADMIN");
        return new ResponseEntity<>(UserMapper.toUserDto(newUser), HttpStatus.CREATED);
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers().stream()
                .map(UserMapper::toUserDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable UUID id) {
        User user = userService.findUserById(id);
        return ResponseEntity.ok(UserMapper.toUserDto(user));
    }

   

    @GetMapping("/roles")
    public ResponseEntity<List<RoleDto>> getAllRoles() {
        List<RoleDto> roles = roleRepository.findAll().stream()
                .map(UserMapper::toRoleDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(roles);
    }


    //     "name": "Super Admin",
    // "email": "admin@sasfc.com",
    // "password": "strongPassword!@#"
}
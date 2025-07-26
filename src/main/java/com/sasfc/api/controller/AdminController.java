package com.sasfc.api.controller;

import com.sasfc.api.dto.*;
import com.sasfc.api.mapper.UserMapper;
import com.sasfc.api.model.Permission;
import com.sasfc.api.model.Role;
import com.sasfc.api.model.User;
import com.sasfc.api.repository.PermissionRepository;
import com.sasfc.api.repository.RoleRepository;
import com.sasfc.api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/admin")
// @PreAuthorize("hasAuthority('USER_MANAGE')") 
public class AdminController {

    private final UserService userService;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    
    public AdminController(UserService userService, RoleRepository roleRepository, PermissionRepository permissionRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
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
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
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

    // --- Permission Management Endpoints ---

    @GetMapping("/permissions")
    public ResponseEntity<List<PermissionDto>> getAllPermissions() {
        List<PermissionDto> permissions = permissionRepository.findAll().stream()
                .map(UserMapper::toPermissionDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(permissions);
    }

    @PostMapping("/permissions")
    public ResponseEntity<PermissionDto> createPermission(@Valid @RequestBody CreatePermissionRequest request) {
        Permission newPermission = userService.createPermission(request);
        return new ResponseEntity<>(UserMapper.toPermissionDto(newPermission), HttpStatus.CREATED);
    }

    @PutMapping("/permissions/{id}")
    public ResponseEntity<PermissionDto> updatePermission(@PathVariable Long id, @Valid @RequestBody CreatePermissionRequest request) {
        Permission updatedPermission = userService.updatePermission(id, request);
        return ResponseEntity.ok(UserMapper.toPermissionDto(updatedPermission));
    }

    @DeleteMapping("/permissions/{id}")
    public ResponseEntity<Void> deletePermission(@PathVariable Long id) {
        userService.deletePermission(id);
        return ResponseEntity.noContent().build();
    }



    @PostMapping("/roles")
    public ResponseEntity<RoleDto> createRole(@Valid @RequestBody CreateRoleRequest request) {
        Role newRole = userService.createRole(request);
        return new ResponseEntity<>(UserMapper.toRoleDto(newRole), HttpStatus.CREATED);
    }

    @PutMapping("/roles/{id}")
    public ResponseEntity<RoleDto> updateRole(@PathVariable Long id, @Valid @RequestBody CreateRoleRequest request) {
        Role updatedRole = userService.updateRole(id, request);
        return ResponseEntity.ok(UserMapper.toRoleDto(updatedRole));
    }

    @DeleteMapping("/roles/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        userService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }

    // --- Role-Permission Management ---

    @PostMapping("/roles/{roleId}/permissions/{permissionId}")
    public ResponseEntity<RoleDto> assignPermissionToRole(
            @PathVariable Long roleId,
            @PathVariable Long permissionId) {
        Role updatedRole = userService.assignPermissionToRole(roleId, permissionId);
        return ResponseEntity.ok(UserMapper.toRoleDto(updatedRole));
    }

    @DeleteMapping("/roles/{roleId}/permissions/{permissionId}")
    public ResponseEntity<RoleDto> removePermissionFromRole(
            @PathVariable Long roleId,
            @PathVariable Long permissionId) {
        Role updatedRole = userService.removePermissionFromRole(roleId, permissionId);
        return ResponseEntity.ok(UserMapper.toRoleDto(updatedRole));
    }


    //     "name": "Super Admin",
    // "email": "admin@sasfc.com",
    // "password": "strongPassword!@#"
}

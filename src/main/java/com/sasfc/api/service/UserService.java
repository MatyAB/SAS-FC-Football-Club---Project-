package com.sasfc.api.service;

import com.sasfc.api.dto.CreatePermissionRequest;
import com.sasfc.api.dto.CreatePermissionRequest;
import com.sasfc.api.dto.CreateRoleRequest;
import com.sasfc.api.dto.CreateUserRequest;
import com.sasfc.api.exception.DuplicateResourceException;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.model.Permission;
import com.sasfc.api.model.Role;
import com.sasfc.api.model.User;
import com.sasfc.api.repository.PermissionRepository;
import com.sasfc.api.repository.RoleRepository;
import com.sasfc.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final PermissionRepository permissionRepository;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, 
    PasswordEncoder passwordEncoder,
     PermissionRepository permissionRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.permissionRepository = permissionRepository;
    }

    @Transactional
    public User createUser(CreateUserRequest request, String roleName) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User with email " + request.getEmail() + " already exists.");
        }

        Role userRole = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRoles(Collections.singleton(userRole));

        return userRepository.save(user);
    }
    
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
    
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public Role createRole(CreateRoleRequest request) {
        if (roleRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Role with name " + request.getName() + " already exists.");
        }
        Role role = new Role();
        role.setName(request.getName());
        return roleRepository.save(role);
    }

    @Transactional
    public Role updateRole(Long id, CreateRoleRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
        if (roleRepository.existsByName(request.getName()) && !role.getName().equals(request.getName())) {
            throw new DuplicateResourceException("Role with name " + request.getName() + " already exists.");
        }
        role.setName(request.getName());
        return roleRepository.save(role);
    }

    @Transactional
    public void deleteRole(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Role not found with id: " + id);
        }
        roleRepository.deleteById(id);
    }

    @Transactional
    public Role assignPermissionToRole(Long roleId, Long permissionId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + roleId));
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Permission not found with id: " + permissionId));

        role.getPermissions().add(permission);
        return roleRepository.save(role);
    }

    @Transactional
    public Role removePermissionFromRole(Long roleId, Long permissionId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + roleId));
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Permission not found with id: " + permissionId));

        role.getPermissions().remove(permission);
        return roleRepository.save(role);
    }

    @Transactional
    public Permission createPermission(CreatePermissionRequest request) {
        if (permissionRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Permission with name " + request.getName() + " already exists.");
        }
        Permission permission = new Permission();
        permission.setName(request.getName());
        permission.setDescription(request.getDescription());
        return permissionRepository.save(permission);
    }

    @Transactional
    public Permission updatePermission(Long id, CreatePermissionRequest request) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Permission not found with id: " + id));
        if (permissionRepository.existsByName(request.getName()) && !permission.getName().equals(request.getName())) {
            throw new DuplicateResourceException("Permission with name " + request.getName() + " already exists.");
        }
        permission.setName(request.getName());
        permission.setDescription(request.getDescription());
        return permissionRepository.save(permission);
    }

    @Transactional
    public void deletePermission(Long id) {
        if (!permissionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Permission not found with id: " + id);
        }
        permissionRepository.deleteById(id);
    }
}

package com.sasfc.api.util;

import com.sasfc.api.model.Permission;
import com.sasfc.api.model.Role;
import com.sasfc.api.model.User;
import com.sasfc.api.repository.PermissionRepository;
import com.sasfc.api.repository.RoleRepository;
import com.sasfc.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // --- Create Permissions ---
        Permission productBrowse = createPermissionIfNotFound("PRODUCT_BROWSE");
        Permission orderCreate = createPermissionIfNotFound("ORDER_CREATE");
        Permission customOrderCreate = createPermissionIfNotFound("CUSTOM_ORDER_CREATE");
        Permission productManageOwn = createPermissionIfNotFound("PRODUCT_MANAGE_OWN");
        Permission orderViewOwn = createPermissionIfNotFound("ORDER_VIEW_OWN");
        Permission customOrderManageAssigned = createPermissionIfNotFound("CUSTOM_ORDER_MANAGE_ASSIGNED");
        Permission posUse = createPermissionIfNotFound("POS_USE");
        Permission userManage = createPermissionIfNotFound("USER_MANAGE");
        Permission orderManageAll = createPermissionIfNotFound("ORDER_MANAGE_ALL");
        Permission inventoryManage = createPermissionIfNotFound("INVENTORY_MANAGE");
        Permission expenseManage = createPermissionIfNotFound("EXPENSE_MANAGE");
        Permission reportView = createPermissionIfNotFound("REPORT_VIEW");
        Permission contentManage = createPermissionIfNotFound("CONTENT_MANAGE");

        // --- Create Roles and Assign Permissions ---

        // CUSTOMER Role
        Set<Permission> customerPermissions = new HashSet<>(Arrays.asList(
                productBrowse, orderCreate, customOrderCreate
        ));
        createRoleIfNotFound("ROLE_CUSTOMER", customerPermissions);

        // VENDOR Role
        Set<Permission> vendorPermissions = new HashSet<>(Arrays.asList(
                productManageOwn, orderViewOwn, customOrderManageAssigned
        ));
        createRoleIfNotFound("ROLE_VENDOR", vendorPermissions);

        // SHOPKEEPER Role
        Set<Permission> shopkeeperPermissions = new HashSet<>(Arrays.asList(
                posUse
        ));
        createRoleIfNotFound("ROLE_SHOPKEEPER", shopkeeperPermissions);

        // ADMIN Role
        Set<Permission> adminPermissions = new HashSet<>(Arrays.asList(
                userManage, orderManageAll, inventoryManage, expenseManage, reportView, contentManage
        ));
        createRoleIfNotFound("ROLE_ADMIN", adminPermissions);

        // --- Create a default Admin User ---
        createUserIfNotFound("admin", "admin@lalidesign.com", "password", "ROLE_ADMIN");
    }

    @Transactional
    private Permission createPermissionIfNotFound(String name) {
        return permissionRepository.findByName(name)
            .orElseGet(() -> {
                Permission permission = new Permission();
                permission.setName(name);
                return permissionRepository.save(permission);
            });
    }

    @Transactional
    private void createRoleIfNotFound(String name, Set<Permission> permissions) {
        roleRepository.findByName(name)
            .ifPresentOrElse(
                role -> {}, // Do nothing if role exists
                () -> {
                    Role role = new Role();
                    role.setName(name);
                    role.setPermissions(permissions);
                    roleRepository.save(role);
                }
            );
    }

    @Transactional
    private void createUserIfNotFound(String name, String email, String password, String roleName) {
        if (userRepository.findByEmail(email).isEmpty()) {
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPasswordHash(passwordEncoder.encode(password));
            
            roleRepository.findByName(roleName).ifPresent(role -> {
                user.setRoles(new HashSet<>(Arrays.asList(role)));
            });
            
            userRepository.save(user);
        }
    }
}

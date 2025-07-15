package com.sasfc.api.util;

import com.sasfc.api.model.Permission;
import com.sasfc.api.model.Role;
import com.sasfc.api.repository.PermissionRepository;
import com.sasfc.api.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // --- Create Permissions ---
        Permission playerRead = createPermissionIfNotFound("PLAYER_READ");
        Permission playerWrite = createPermissionIfNotFound("PLAYER_WRITE");
        Permission newsRead = createPermissionIfNotFound("NEWS_READ");
        Permission newsWrite = createPermissionIfNotFound("NEWS_WRITE");
        Permission matchRead = createPermissionIfNotFound("MATCH_READ");
        Permission matchWrite = createPermissionIfNotFound("MATCH_WRITE");
        Permission galleryRead = createPermissionIfNotFound("GALLERY_READ");
        Permission galleryWrite = createPermissionIfNotFound("GALLERY_WRITE");
        Permission userManage = createPermissionIfNotFound("USER_MANAGE");
        
        // --- Create Roles and Assign Permissions ---

        // EDITOR Role
        Set<Permission> editorPermissions = new HashSet<>(Arrays.asList(
            playerRead, newsRead, newsWrite, matchRead, galleryRead, galleryWrite
        ));
        createRoleIfNotFound("ROLE_EDITOR", editorPermissions);

        // ADMIN Role
        Set<Permission> adminPermissions = new HashSet<>(Arrays.asList(
            playerRead, playerWrite, newsRead, newsWrite, matchRead, matchWrite,
            galleryRead, galleryWrite, userManage
        ));
        createRoleIfNotFound("ROLE_ADMIN", adminPermissions);
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
}
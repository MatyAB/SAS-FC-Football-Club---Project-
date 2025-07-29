package com.sasfc.api.util;

import com.sasfc.api.model.Permission;
import com.sasfc.api.model.Role;
import com.sasfc.api.repository.PermissionRepository;
import com.sasfc.api.model.Team;
import com.sasfc.api.model.User;
import com.sasfc.api.model.enums.TeamCategory;
import com.sasfc.api.repository.RoleRepository;
import com.sasfc.api.repository.TeamRepository;
import com.sasfc.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("ADMIN role not found!"));
        createRoleIfNotFound("ROLE_ADMIN", adminPermissions);

        // --- Create Admin User ---
        createUserIfNotFound("admin", "admin@sasfc.com", "password", adminRole);

        // --- Create Teams ---
      //  createTeamIfNotFound("SAS FC", "SAS", "sas_fc_logo.png", 2000, "SAS Arena", TeamCategory.FIRST_TEAM);
     //   createTeamIfNotFound("Addis FC", "ADFC", "addis_fc_logo.png", 1995, "Addis Ababa Stadium", TeamCategory.FIRST_TEAM);
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
    private void createTeamIfNotFound(String name, String shortName, String logoUrl, int foundedYear, String homeStadium, TeamCategory category) {
        teamRepository.findByName(name)
            .ifPresentOrElse(
                team -> {}, 
                () -> {
                    Team team = new Team();
                    team.setName(name);
                    team.setShortName(shortName);
                    team.setLogoUrl(logoUrl);
                    team.setFoundedYear(foundedYear);
                    team.setHomeStadium(homeStadium);
                    team.setCategory(category); 
                    teamRepository.save(team);
                }
            );
    }

    @Transactional
    private void createUserIfNotFound(String username, String email, String password, Role role) {
        userRepository.findByEmail(email)
            .ifPresentOrElse(
                user -> {}, // Do nothing if user exists
                () -> {
                    User user = new User();
                    user.setName(username);
                    user.setEmail(email);
                    user.setPasswordHash(passwordEncoder.encode(password));
                    user.setRoles(Collections.singleton(role));
                    userRepository.save(user);
                }
            );
    }
}

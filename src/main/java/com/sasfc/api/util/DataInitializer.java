package com.sasfc.api.util;

import com.sasfc.api.model.Permission;
import com.sasfc.api.model.Role;
import com.sasfc.api.repository.PermissionRepository;
import com.sasfc.api.model.Permission;
import com.sasfc.api.model.Role;
import com.sasfc.api.model.Team;
import com.sasfc.api.model.enums.TeamCategory;
import com.sasfc.api.repository.PermissionRepository;
import com.sasfc.api.repository.RoleRepository;
import com.sasfc.api.repository.TeamRepository;
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

    @Autowired
    private TeamRepository teamRepository;

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

        // --- Create Teams ---
        createTeamIfNotFound("SAS FC", "SAS", "sas_fc_logo.png", 2000, "SAS Arena", TeamCategory.FIRST_TEAM);
        createTeamIfNotFound("Addis FC", "ADFC", "addis_fc_logo.png", 1995, "Addis Ababa Stadium", TeamCategory.FIRST_TEAM);
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
                team -> {}, // Do nothing if team exists
                () -> {
                    Team team = new Team();
                    team.setName(name);
                    team.setShortName(shortName);
                    team.setLogoUrl(logoUrl);
                    team.setFoundedYear(foundedYear);
                    team.setHomeStadium(homeStadium);
                    // team.setCategory(category); // Assuming TeamCategory will be added to Team model
                    teamRepository.save(team);
                }
            );
    }
}

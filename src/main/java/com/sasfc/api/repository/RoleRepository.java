package com.sasfc.api.repository;

import com.sasfc.api.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    // We'll need this to assign roles to users by name
    Optional<Role> findByName(String name);
}
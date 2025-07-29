package com.sasfc.api.repository;

import com.sasfc.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Essential for the login process
    Optional<User> findByEmail(String email);

    // Useful for registration to check if an email is already taken
    Boolean existsByEmail(String email);

    Optional<User> findByUsername(String username);
}

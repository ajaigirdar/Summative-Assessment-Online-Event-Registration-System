package com.example.eventRegistration.repository;

import com.example.eventRegistration.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom method to find a user by email
    Optional<User> findByEmail(String email);
}
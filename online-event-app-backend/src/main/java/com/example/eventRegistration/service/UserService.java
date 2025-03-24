package com.example.eventRegistration.service;

import com.example.eventRegistration.model.User;
import com.example.eventRegistration.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user
    public User registerUser(String name, String email, String password, String role) {
        // Check if the email is already taken
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        // Create a new User object with hashed password
        User user = new User(
                name,
                email,
                passwordEncoder.encode(password),
                role
        );

        // Save the user to the database and return it
        return userRepository.save(user);
    }
}
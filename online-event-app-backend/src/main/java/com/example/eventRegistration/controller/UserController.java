package com.example.eventRegistration.controller;

import com.example.eventRegistration.model.User;
import com.example.eventRegistration.repository.UserRepository;
import com.example.eventRegistration.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    // Handle user signup requests
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User userRequest) {
        User user = userService.registerUser(
                userRequest.getName(),
                userRequest.getEmail(),
                userRequest.getPassword(),
                "USER" // All new users are assigned the USER role
        );
        return ResponseEntity.ok(user);
    }

    // Get details of the currently authenticated user
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }
}
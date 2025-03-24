package com.example.eventRegistration.controller;

import com.example.eventRegistration.model.User;
import com.example.eventRegistration.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User userRequest) {
        User user = userService.registerUser(
                userRequest.getName(),
                userRequest.getEmail(),
                userRequest.getPassword(),
                "USER"          // Fixed role for all signups
        );
        return ResponseEntity.ok(user);
    }
}
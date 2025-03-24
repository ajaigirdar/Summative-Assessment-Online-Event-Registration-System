package com.example.eventRegistration;

import com.example.eventRegistration.model.User;
import com.example.eventRegistration.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EventRegistrationApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Main method to start the Spring Boot application
    public static void main(String[] args) {
        SpringApplication.run(EventRegistrationApplication.class, args);
    }

    // Runs after the application context is fully initialized
    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@eventz.com").isEmpty()) {

            User admin = new User(
                    "Admin",
                    "admin@eventz.com",
                    passwordEncoder.encode("admin123"),
                    "ADMIN"
            );

            userRepository.save(admin);

            System.out.println("Admin user created: admin@eventz.com");
        } else {
            System.out.println("Admin user already exists: admin@eventz.com");
        }
    }
}
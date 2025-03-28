package com.example.eventRegistration.controller;

import com.example.eventRegistration.model.Event;
import com.example.eventRegistration.model.Registration;
import com.example.eventRegistration.model.User;
import com.example.eventRegistration.repository.EventRepository;
import com.example.eventRegistration.repository.RegistrationRepository;
import com.example.eventRegistration.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    // Get all events the current user is registered for
    @GetMapping("/users/me/events")
    public ResponseEntity<List<Event>> getRegisteredEvents(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Registration> registrations = registrationRepository.findAll();
        List<Event> registeredEvents = registrations.stream()
                .filter(reg -> reg.getUser().getUserId().equals(user.getUserId()))
                .map(Registration::getEvent)
                .collect(Collectors.toList());
        return ResponseEntity.ok(registeredEvents);
    }

    // Register for an event
    @PostMapping("/events/{id}/register")
    public ResponseEntity<String> registerForEvent(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Optional<Event> eventOpt = eventRepository.findById(id);
        if (!eventOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Event event = eventOpt.get();
        boolean alreadyRegistered = registrationRepository.findAll().stream()
                .anyMatch(reg -> reg.getUser().getUserId().equals(user.getUserId()) &&
                        reg.getEvent().getEventId().equals(event.getEventId()));
        if (alreadyRegistered) {
            return ResponseEntity.badRequest().body("Already registered");
        }
        Registration registration = new Registration(user, event);
        registrationRepository.save(registration);
        return ResponseEntity.ok("Registered successfully");
    }

    // Unregister from an event
    @DeleteMapping("/events/{id}/register")
    public ResponseEntity<String> unregisterFromEvent(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Optional<Event> eventOpt = eventRepository.findById(id);
        if (!eventOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Event event = eventOpt.get();
        Optional<Registration> registrationOpt = registrationRepository.findAll().stream()
                .filter(reg -> reg.getUser().getUserId().equals(user.getUserId()) &&
                        reg.getEvent().getEventId().equals(event.getEventId()))
                .findFirst();
        if (!registrationOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Not registered for this event");
        }
        registrationRepository.delete(registrationOpt.get());
        return ResponseEntity.ok("Unregistered successfully");
    }
}
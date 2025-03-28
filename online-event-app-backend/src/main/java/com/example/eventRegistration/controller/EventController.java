package com.example.eventRegistration.controller;

import com.example.eventRegistration.model.Event;
import com.example.eventRegistration.model.Registration;
import com.example.eventRegistration.repository.EventRepository;
import com.example.eventRegistration.repository.RegistrationRepository;
import com.example.eventRegistration.repository.UserRepository;
import com.example.eventRegistration.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    // Get all events, including registration status for the current user
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents(@AuthenticationPrincipal UserDetails userDetails) {
        List<Event> events = eventRepository.findAll();
        System.out.println("Fetching all events, userDetails: " + (userDetails != null ? userDetails.getUsername() : "null"));
        if (userDetails != null) {
            String email = userDetails.getUsername();
            System.out.println("User email: " + email);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            System.out.println("Found user: " + user.getUserId());
            List<Registration> registrations = registrationRepository.findAll();
            System.out.println("Registrations count: " + registrations.size());
            events.forEach(event -> {
                boolean isRegistered = registrations.stream()
                        .anyMatch(reg -> reg.getUser().getUserId().equals(user.getUserId()) &&
                                reg.getEvent().getEventId().equals(event.getEventId()));
                event.setIsRegistered(isRegistered);
                System.out.println("Event " + event.getEventId() + ": isRegistered = " + event.isRegistered());
            });
        } else {
            System.out.println("No user logged in, setting all isRegistered to false");
            events.forEach(event -> event.setIsRegistered(false));
        }
        return ResponseEntity.ok(events);
    }

    // Get an event by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> eventOpt = eventRepository.findById(id);
        return eventOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new event
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }

    // Update an existing event
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Optional<Event> eventOpt = eventRepository.findById(id);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            event.setTitle(updatedEvent.getTitle());
            event.setDescription(updatedEvent.getDescription());
            event.setDateTime(updatedEvent.getDateTime());
            event.setLocation(updatedEvent.getLocation());
            event.setImageUrl(updatedEvent.getImageUrl());
            Event savedEvent = eventRepository.save(event);
            return ResponseEntity.ok(savedEvent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an event
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        Optional<Event> eventOpt = eventRepository.findById(id);
        if (eventOpt.isPresent()) {
            eventRepository.delete(eventOpt.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
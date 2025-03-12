# Summative-Assessment-Online-Event-Registration-System

## Features

- **User Registration & Login:**  
  Secure registration and authentication using Spring Security.

- **Event Registration:**  
  Authenticated users can register for events.

- **Admin Dashboard:**  
  Administrators can perform full CRUD operations on events.

- **Role-Based Security:**  
  Endpoints are secured by user roles (`ROLE_USER` and `ROLE_ADMIN`).


# User Stories

## 1. User Registration and Authentication

- **User Registration**  
  The system allows a new visitor to register for an account so that they can access and register for events.

- **User Login**  
  The system permits a registered user to log in so that they can view event details and register for events.

- **Authentication Feedback**  
  The system provides clear error messages if login fails, so that users are informed about the issue and can try again.

## 2. Event Viewing and Registration

- **Event Listing**  
  The system displays a list of upcoming events for any visitor, enabling them to decide which events to attend.

- **Event Details**  
  The system allows a user to select an event from the list to view its details (such as description, date, time, and location), ensuring that they have all the necessary information.

- **Event Registration**  
  The system enables a registered user to register for an event, ensuring their participation.

## 3. Admin Operations

- **Admin Login**  
  The system permits an administrator to log in using admin credentials, granting access to admin-specific functions.

- **Create Event**  
  The system allows an administrator to create new events by entering the necessary event details, so that upcoming events can be published for users to register.

- **Update Event**  
  The system enables an administrator to update existing events to correct or modify event details as needed.

- **Delete Event**  
  The system allows an administrator to delete events, ensuring that canceled or outdated events are removed from the listing.

- **Admin Dashboard**  
  The system provides an admin dashboard where administrators can view and manage all events and registrations efficiently.

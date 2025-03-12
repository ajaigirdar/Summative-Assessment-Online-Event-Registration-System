# Online Event Registration System 📅

## Project Overview

The Event Management Application is a full-stack web application that allows users to view and register for events while providing administrators with tools to manage events. The project integrates a Java Spring Boot backend with a MySQL database and a React-based frontend. The application aims to provide a user-friendly interface, secure authentication, and role-based access to ensure that only authorized users can manage events.

## Features

- **User Registration & Login:**  
  Secure registration and authentication using Spring Security.

- **Event Registration:**  
  Authenticated users can register for events.

- **Admin Dashboard:**  
  Administrators can perform full CRUD operations on events.

- **Role-Based Security:**  
  Endpoints are secured by user roles (`ROLE_USER` and `ROLE_ADMIN`).

  ## In Scope

- **User Features:**
  - **Account Management:**  
    - User registration with secure password storage.
    - User login and authentication.
  - **Event Interaction:**  
    - Viewing a list of upcoming events.
    - Viewing event details (description, date, time, location).
    - Event registration for logged-in users.
    
- **Admin Features:**
  - **Authentication and Authorization:**  
    - Admin login using secure credentials.
    - Role-based access control to restrict administrative functions.
  - **Event Management:**  
    - Creating new events by entering event details.
    - Updating existing events.
    - Deleting events.
  - **Dashboard Overview:**  
    - Viewing a summary of events and registrations for monitoring and management purposes.



# User Stories 📝

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

# Technology Stack

## Backend

- Java: Core business logic and data processing
- Spring Boot: Production ready configuration files
- MySQL: Relational database for storing app data (rally data, users data)
- Node.js: API server requests

## Frontend

- React.js: Component library for modern app design

# Project Roadmap 🗺️

| Day Number | Date        | Day       | Activities                 |
|------------|-------------|-----------|----------------------------|
| x          | 03-10 2025  | Monday    | Planning Day               |
| 17         | 03-11 2025  | Tuesday   | React All Day              |
| 16         | 03-12 2025  | Wednesday | React Half Day, Design     |
| 15         | 03-13 2025  | Thursday  | React All Day              |
| 14         | 03-14 2025  | Friday    | React Half Day, Design     |
| 13         | 03-15 2025  | Saturday  | Project Design             |
| 12         | 03-16 2025  | Sunday    | Project Design             |
| 11         | 03-17 2025  | Monday    | Python All Day             |
| 10         | 03-18 2025  | Tuesday   | Python All Day             |
| 9          | 03-19 2025  | Wednesday | Python All Day             |
| 8          | 03-20 2025  | Thursday  | Project                    |
| 7          | 03-21 2025  | Friday    | Project, Cloud             |
| 6          | 03-22 2025  | Saturday  | Project                    |
| 5          | 03-23 2025  | Sunday    | Project                    |
| 4          | 03-24 2025  | Monday    | Project, Cloud             |
| 3          | 03-25 2025  | Tuesday   | Project                    |
| 2          | 03-26 2025  | Wednesday | Project, Cloud             |
| 1          | 03-27 2025  | Thursday  | Project                    |
|            | 03-28 2025  | Friday    | Presentation Day           |


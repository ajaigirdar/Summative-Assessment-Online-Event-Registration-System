# Database Schema Documentation: `event_db`

## 1. Overview
The `event_db` database is designed to **manage events, user registrations, locations, and images**. It consists of four main tables:  
- **`users`** → Stores user details and authentication data.  
- **`locations`** → Stores event locations and capacities.  
- **`events`** → Stores event details, including an associated location and an image URL.  
- **`registrations`** → Tracks users registering for events.  

This schema ensures **data integrity** through **primary keys (PKs), foreign keys (FKs), and constraints**.

---

## 2. SQL Schema Definition
```sql
-- Drop the database if it exists (for a fresh start)
DROP DATABASE IF EXISTS event_db;
CREATE DATABASE event_db;
USE event_db;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the locations table
CREATE TABLE IF NOT EXISTS locations (
    location_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255) NOT NULL,
    room_number VARCHAR(50),
    capacity INT CHECK (capacity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the events table
CREATE TABLE IF NOT EXISTS events (
    event_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dateTime DATETIME NOT NULL,
    location_id BIGINT NOT NULL,
    image_url VARCHAR(500), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) 
        ON DELETE CASCADE
);

-- Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
    registration_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
        ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(event_id) 
        ON DELETE CASCADE
);
```

## 3. Tables and Columns

### Users Table  
Stores information about registered users, including their roles and login credentials.

| Column Name  | Data Type       | Constraints                 | Description                        |
|-------------|----------------|-----------------------------|------------------------------------|
| `user_id`   | `BIGINT`        | `PRIMARY KEY AUTO_INCREMENT` | Unique identifier for each user.  |
| `name`      | `VARCHAR(255)`  | `NOT NULL`                  | Full name of the user.            |
| `email`     | `VARCHAR(255)`  | `NOT NULL UNIQUE`           | Unique email address for login.   |
| `password`  | `VARCHAR(255)`  | `NOT NULL`                  | Encrypted password.               |
| `role`      | `ENUM('admin', 'user')` | `NOT NULL DEFAULT 'user'` | Defines user role. |
| `created_at` | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP` | Record creation timestamp. |

---

### Locations Table  
Stores available locations for events, including room details and capacity.

| Column Name  | Data Type       | Constraints                 | Description                         |
|-------------|----------------|-----------------------------|-------------------------------------|
| `location_id` | `BIGINT`      | `PRIMARY KEY AUTO_INCREMENT` | Unique identifier for each location. |
| `room_name`   | `VARCHAR(255)` | `NOT NULL`                  | Name of the room.                   |
| `room_number` | `VARCHAR(50)`  | `NULLABLE`                  | Room number (if applicable).        |
| `capacity`    | `INT`         | `CHECK (capacity > 0)`      | Maximum number of attendees.        |
| `created_at`  | `TIMESTAMP`   | `DEFAULT CURRENT_TIMESTAMP` | Record creation timestamp.          |

---

### Events Table  
Stores details of events, including the date, time, and associated location.

| Column Name  | Data Type       | Constraints                 | Description                            |
|-------------|----------------|-----------------------------|----------------------------------------|
| `event_id`  | `BIGINT`        | `PRIMARY KEY AUTO_INCREMENT` | Unique identifier for each event.     |
| `title`     | `VARCHAR(255)`  | `NOT NULL`                  | Event title.                          |
| `description` | `TEXT`       | `NULLABLE`                   | Detailed description of the event.    |
| `dateTime`  | `DATETIME`      | `NOT NULL`                   | Date and time of the event.           |
| `location_id` | `BIGINT`      | `NOT NULL, FOREIGN KEY`      | Links to `locations(location_id)`.    |
| `image_url` | `VARCHAR(500)`  | `NULLABLE`                   | URL for the event image.              |
| `created_at` | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP` | Record creation timestamp.            |

---

### Registrations Table  
Stores user registrations for events, establishing many-to-many relationships between users and events.

| Column Name  | Data Type       | Constraints                 | Description                              |
|-------------|----------------|-----------------------------|------------------------------------------|
| `registration_id` | `BIGINT` | `PRIMARY KEY AUTO_INCREMENT` | Unique identifier for each registration. |
| `user_id`   | `BIGINT`        | `NOT NULL, FOREIGN KEY`      | Links to `users(user_id)`.              |
| `event_id`  | `BIGINT`        | `NOT NULL, FOREIGN KEY`      | Links to `events(event_id)`.            |
| `registration_date` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Date and time of registration. |

---

## 4. Relationships  
The schema establishes the following relationships:

### **Users → Registrations (1:M)**  
- A **single user** can register for **multiple events**.  
- The `user_id` in `registrations` references `users(user_id)`.  

### **Locations → Events (1:M)**  
- A **single location** can host **multiple events**.  
- The `location_id` in `events` references `locations(location_id)`.  

### **Events → Registrations (1:M)**  
- An **event** can have **multiple registered users**.  
- The `event_id` in `registrations` references `events(event_id)`.  

Together, this schema enables efficient event management, ensuring **data integrity and scalability**.

---

## 5. Constraints and Integrity

- **Primary Keys (PKs):** Ensure uniqueness of records.  
- **Foreign Keys (FKs):** Enforce referential integrity.  
- **Auto-Increment:** Automatically generate `id` values.  

### **Cascade Delete Rules:**
- If a **location** is deleted, all its associated **events** are deleted.  
- If an **event** is deleted, all **registrations** for it are removed.  
- If a **user** is deleted, their **registrations** are deleted.  

## 6. Data Seeding for Initial Setup

To ensure that the system has the required **default data** for testing and initial deployment, we provide seed data for **users, locations, and events**. This script inserts essential data into the database.

---

### **6.1 SQL Script for Data Seeding**
```sql
-- Insert default users (admin and regular user)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', 'adminpassword', 'admin'),
('John Doe', 'john@example.com', 'userpassword', 'user'),
('Jane Smith', 'jane@example.com', 'userpassword', 'user');

-- Insert default locations
INSERT INTO locations (room_name, room_number, capacity) VALUES 
('Conference Room A', '101', 50),
('Main Hall', '202', 200),
('Training Room', '303', 30);

-- Insert default events
INSERT INTO events (title, description, dateTime, location_id, image_url) VALUES 
('Tech Conference 2025', 'A conference for tech enthusiasts.', '2025-06-15 09:00:00', 1, 'https://example.com/tech-event.jpg'),
('Marketing Summit', 'Networking event for marketers.', '2025-07-20 10:30:00', 2, 'https://example.com/marketing-summit.jpg'),
('Software Bootcamp', 'A hands-on training session for developers.', '2025-08-05 14:00:00', 3, 'https://example.com/software-bootcamp.jpg');

-- Insert default event registrations
INSERT INTO registrations (user_id, event_id) VALUES 
(2, 1), -- John Doe registers for Tech Conference
(3, 2), -- Jane Smith registers for Marketing Summit
(2, 3); -- John Doe registers for Software Bootcamp

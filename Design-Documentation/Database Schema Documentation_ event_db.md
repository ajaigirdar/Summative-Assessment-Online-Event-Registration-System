# Database Schema Documentation: `event_db`

## 1. Overview
The `event_db` database is designed to manage events, user registrations, and locations. It consists of four tables: `users`, `locations`, `events`, and `registrations`. This schema ensures proper data organization and enforces referential integrity through **primary keys (PKs)** and **foreign keys (FKs)**.

---

```
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

## 2. Tables and Columns

### Users Table
Stores information about registered users, including their roles and login credentials.

| Column Name  | Data Type     | Constraints                 | Description                        |
|-------------|--------------|-----------------------------|------------------------------------|
| `user_id`   | `BIGINT`      | `PRIMARY KEY AUTO_INCREMENT` | Unique identifier for each user.  |
| `name`      | `VARCHAR(255)` | `NULLABLE`                  | Full name of the user.            |
| `email`     | `VARCHAR(255)` | `NOT NULL UNIQUE`           | Unique email address for login.   |
| `password`  | `VARCHAR(255)` | `NOT NULL`                  | Encrypted password.               |
| `role`      | `VARCHAR(50)`  | `NOT NULL`                  | Defines user role (e.g., `admin`, `user`). |

---

### Locations Table
Stores available locations for events, including room details and capacity.

| Column Name  | Data Type     | Constraints                 | Description                         |
|-------------|--------------|-----------------------------|-------------------------------------|
| `location_id` | `BIGINT`     | `PRIMARY KEY AUTO_INCREMENT` | Unique identifier for each location. |
| `room_name`   | `VARCHAR(255)` | `NOT NULL`                  | Name of the room.                   |
| `room_number` | `VARCHAR(255)` | `NULLABLE`                  | Room number (if applicable).        |
| `capacity`    | `INT`        | `NULLABLE`                  | Maximum number of attendees.        |

---

### Events Table
Stores details of events, including the date, time, and associated location.

| Column Name  | Data Type     | Constraints                 | Description                            |
|-------------|--------------|-----------------------------|----------------------------------------|
| `event_id`  | `BIGINT`      | `PRIMARY KEY AUTO_INCREMENT` | Unique identifier for each event.     |
| `title`     | `VARCHAR(255)` | `NULLABLE`                  | Event title.                          |
| `description` | `TEXT`      | `NULLABLE`                  | Detailed description of the event.    |
| `dateTime`  | `DATETIME`    | `NULLABLE`                  | Date and time of the event.           |
| `location_id` | `BIGINT`    | `NULLABLE, FOREIGN KEY`      | Links to `locations(location_id)`.    |

---

### Registrations Table
Stores user registrations for events, establishing many-to-many relationships between users and events.

| Column Name  | Data Type     | Constraints                 | Description                              |
|-------------|--------------|-----------------------------|------------------------------------------|
| `registration_id` | `BIGINT` | `PRIMARY KEY AUTO_INCREMENT` | Unique identifier for each registration. |
| `user_id`   | `BIGINT`      | `NOT NULL, FOREIGN KEY`      | Links to `users(user_id)`.              |
| `event_id`  | `BIGINT`      | `NOT NULL, FOREIGN KEY`      | Links to `events(event_id)`.            |

---

## 3. Relationships
The schema establishes the following relationships:

1. **Users → Registrations (1:M)**
   - A single user can register for multiple events.
   - The `user_id` in `registrations` references `users(user_id)`.
   
2. **Locations → Events (1:M)**
   - A single location can host multiple events.
   - The `location_id` in `events` references `locations(location_id)`.
   
3. **Events → Registrations (1:M)**
   - An event can have multiple registered users.
   - The `event_id` in `registrations` references `events(event_id)`.
   
Together, this schema enables efficient event management, ensuring data integrity and scalability.

---

## 4. Constraints and Integrity
- **Primary Keys (PKs):** Ensure uniqueness of records.
- **Foreign Keys (FKs):** Enforce referential integrity.
- **Unique Constraints:** Ensure emails remain unique.
- **Auto-Increment:** Automatically generate `id` values.

This structured design ensures **efficient querying**, **data consistency**, and **scalability**.

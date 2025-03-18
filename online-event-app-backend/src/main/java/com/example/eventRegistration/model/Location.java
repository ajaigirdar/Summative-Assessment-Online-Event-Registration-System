package com.example.eventRegistration.model;

import jakarta.persistence.*;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "room_name", nullable = false)
    private String roomName;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "capacity")
    private Integer capacity;

    public Location() {
    }

    public Location(String roomName, String roomNumber, Integer capacity) {
        this.roomName = roomName;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
    }

    // Getters and Setters
    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
}

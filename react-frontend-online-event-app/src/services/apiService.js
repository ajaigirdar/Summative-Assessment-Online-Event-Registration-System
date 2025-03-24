import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Fetch all events (public)
export function getEvents() {
  return axios.get(`${API_BASE_URL}/api/events`);
}

// Fetch all locations (public)
export function getLocations() {
  return axios.get(`${API_BASE_URL}/api/locations`);
}

// Sign up a new user (public)
export function signupUser(name, email, password) {
  return axios.post(`${API_BASE_URL}/api/users/signup`, {
    name,
    email,
    password,
  });
}

// Login a user
export function loginUser(email, password) {
  return axios.get(`${API_BASE_URL}/api/events`, {
    auth: { username: email, password },
  });
}

// Create an event (admin-only)
export function createEvent(eventData, credentials) {
  return axios.post(`${API_BASE_URL}/api/events`, eventData, {
    auth: credentials,
  });
}

// Update an event (admin-only)
export function updateEvent(eventId, eventData, credentials) {
  return axios.put(`${API_BASE_URL}/api/events/${eventId}`, eventData, {
    auth: credentials,
  });
}

// Delete an event (admin-only)
export function deleteEvent(eventId, credentials) {
  return axios.delete(`${API_BASE_URL}/api/events/${eventId}`, {
    auth: credentials,
  });
}

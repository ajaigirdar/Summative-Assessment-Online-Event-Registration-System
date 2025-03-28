import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Fetch all events
export function getEvents(credentials) {
  return axios.get(
    `${API_BASE_URL}/api/events`,
    credentials ? { auth: credentials } : {}
  );
}

// Fetch all locations
export function getLocations() {
  return axios.get(`${API_BASE_URL}/api/locations`);
}

// Verify user credentials for login
export function loginUser(email, password) {
  return axios.get(`${API_BASE_URL}/api/events`, {
    auth: { username: email, password },
  });
}

// Create a new user account
export function signupUser(name, email, password) {
  return axios.post(`${API_BASE_URL}/api/users/signup`, {
    name,
    email,
    password,
  });
}

// Create a new event (admin only)
export function createEvent(eventData, credentials) {
  return axios.post(`${API_BASE_URL}/api/events`, eventData, {
    auth: credentials,
  });
}

// Update an existing event (admin only)
export function updateEvent(eventId, eventData, credentials) {
  return axios.put(`${API_BASE_URL}/api/events/${eventId}`, eventData, {
    auth: credentials,
  });
}

// Delete an event (admin only)
export function deleteEvent(eventId, credentials) {
  return axios.delete(`${API_BASE_URL}/api/events/${eventId}`, {
    auth: credentials,
  });
}

// Fetch the current user's details
export function getCurrentUser(credentials) {
  return axios.get(`${API_BASE_URL}/api/users/me`, {
    auth: credentials,
  });
}

// Fetch the user's registered events
export function getRegisteredEvents(credentials) {
  return axios.get(`${API_BASE_URL}/api/users/me/events`, {
    auth: credentials,
  });
}

// Register for an event
export function registerEvent(eventId, credentials) {
  return axios.post(
    `${API_BASE_URL}/api/events/${eventId}/register`,
    {},
    {
      auth: credentials,
    }
  );
}

// Unregister from an event
export function unregisterEvent(eventId, credentials) {
  return axios.delete(`${API_BASE_URL}/api/events/${eventId}/register`, {
    auth: credentials,
  });
}

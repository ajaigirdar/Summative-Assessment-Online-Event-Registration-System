import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import {
  getEvents,
  getLocations,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../services/apiService';
import './AdminPage.css';

const AdminPage = ({ credentials }) => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    dateTime: '',
    description: '',
    imageUrl: '',
    location: null,
  });

  useEffect(() => {
    fetchEvents();
    fetchLocations();
  }, []);

  const fetchEvents = () => {
    getEvents()
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching events:', error));
  };

  const fetchLocations = () => {
    getLocations()
      .then((response) => setLocations(response.data))
      .catch((error) => console.error('Error fetching locations:', error));
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'location') {
      const selectedLocation = locations.find(
        (loc) => loc.locationId === parseInt(e.target.value)
      );
      setNewEvent({ ...newEvent, location: selectedLocation });
    } else {
      setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    createEvent(newEvent, credentials)
      .then((response) => {
        setEvents([...events, response.data]);
        setNewEvent({
          title: '',
          dateTime: '',
          description: '',
          imageUrl: '',
          location: null,
        });
      })
      .catch((error) =>
        console.error('Error adding event:', error.response?.status)
      );
  };

  const handleUpdateEvent = (eventId) => {
    const eventToUpdate = events.find((event) => event.eventId === eventId);
    const updatedData = {
      ...eventToUpdate,
      title: `${eventToUpdate.title} (Updated)`,
    };
    updateEvent(eventId, updatedData, credentials)
      .then((response) => {
        setEvents(
          events.map((event) =>
            event.eventId === eventId ? response.data : event
          )
        );
      })
      .catch((error) =>
        console.error('Error updating event:', error.response?.status)
      );
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId, credentials)
      .then(() => {
        setEvents(events.filter((event) => event.eventId !== eventId));
      })
      .catch((error) =>
        console.error('Error deleting event:', error.response?.status)
      );
  };

  // Check if user is authenticated
  if (!credentials) {
    return <div>Please log in as an admin to access this page.</div>;
  }

  return (
    <div className="admin-page">
      <h1>Admin - Manage Events</h1>
      <section className="admin-add-event">
        <h2>Add New Event</h2>
        <form onSubmit={handleAddEvent}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={newEvent.title}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="dateTime">Date & Time:</label>
          <input
            id="dateTime"
            name="dateTime"
            type="datetime-local"
            value={newEvent.dateTime}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={newEvent.imageUrl}
            onChange={handleInputChange}
          />
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            name="location"
            value={newEvent.location?.locationId || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.locationId} value={loc.locationId}>
                {loc.roomName} ({loc.roomNumber})
              </option>
            ))}
          </select>
          <button type="submit">Add Event</button>
        </form>
      </section>
      <section className="admin-event-list">
        <h2>Existing Events</h2>
        <EventList
          events={events}
          admin={true}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
        />
      </section>
    </div>
  );
};

export default AdminPage;

// AdminPage.jsx
// Component for the admin page to manage events (add, update, delete)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  // State for managing events, locations, and form data
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    dateTime: '',
    description: '',
    imageUrl: '',
    location: null,
  });
  const [editEvent, setEditEvent] = useState(null);
  const [message, setMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const navigate = useNavigate();

  // Fetch events and locations on mount, redirect if not logged in
  useEffect(() => {
    if (!credentials) {
      navigate('/');
      return;
    }
    fetchEvents();
    fetchLocations();
  }, [credentials, navigate]);

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

  // Handle input changes for the add event form
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

  // Handle form submission to add a new event
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
        setMessage('Event added successfully!');
      })
      .catch((error) =>
        setMessage(`Error adding event: ${error.response?.status}`)
      );
  };

  // Handle input changes for the edit event modal
  const handleEditChange = (e) => {
    if (e.target.name === 'location') {
      const selectedLocation = locations.find(
        (loc) => loc.locationId === parseInt(e.target.value)
      );
      setEditEvent({ ...editEvent, location: selectedLocation });
    } else {
      setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
    }
  };

  // Handle updating an event (open modal or save changes)
  const handleUpdateEvent = (eventId) => {
    if (!editEvent) {
      const eventToUpdate = events.find((event) => event.eventId === eventId);
      setEditEvent(eventToUpdate);
      setMessage('');
    } else {
      updateEvent(eventId, editEvent, credentials)
        .then((response) => {
          setEvents(
            events.map((event) =>
              event.eventId === eventId ? response.data : event
            )
          );
          setEditEvent(null);
          setMessage('Event updated successfully!');
        })
        .catch((error) =>
          setMessage(`Error updating event: ${error.response?.status}`)
        );
    }
  };

  // Handle opening the delete confirmation modal
  const handleDeleteEvent = (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteConfirm(true);
  };

  // Confirm deletion of an event
  const confirmDelete = () => {
    deleteEvent(eventToDelete, credentials)
      .then(() => {
        setEvents(events.filter((event) => event.eventId !== eventToDelete));
        setMessage('Event deleted successfully!');
        setShowDeleteConfirm(false);
        setEventToDelete(null);
      })
      .catch((error) =>
        setMessage(`Error deleting event: ${error.response?.status}`)
      );
  };

  // Cancel deletion and close the modal
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setEventToDelete(null);
  };

  if (!credentials) {
    return <div>Please log in as an admin to access this page.</div>;
  }

  return (
    <div className="admin-page">
      <h1>Admin - Manage Events</h1>

      {message && (
        <p className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </p>
      )}
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
      {editEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Event</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateEvent(editEvent.eventId);
              }}
            >
              <label htmlFor="editTitle">Title:</label>
              <input
                id="editTitle"
                name="title"
                type="text"
                value={editEvent.title}
                onChange={handleEditChange}
                required
              />
              <label htmlFor="editDateTime">Date & Time:</label>
              <input
                id="editDateTime"
                name="dateTime"
                type="datetime-local"
                value={editEvent.dateTime.slice(0, 16)}
                onChange={handleEditChange}
                required
              />
              <label htmlFor="editDescription">Description:</label>
              <textarea
                id="editDescription"
                name="description"
                value={editEvent.description}
                onChange={handleEditChange}
                required
              />
              <label htmlFor="editImageUrl">Image URL:</label>
              <input
                id="editImageUrl"
                name="imageUrl"
                type="url"
                value={editEvent.imageUrl}
                onChange={handleEditChange}
              />
              <label htmlFor="editLocation">Location:</label>
              <select
                id="editLocation"
                name="location"
                value={editEvent.location?.locationId || ''}
                onChange={handleEditChange}
                required
              >
                <option value="">Select a location</option>
                {locations.map((loc) => (
                  <option key={loc.locationId} value={loc.locationId}>
                    {loc.roomName} ({loc.roomNumber})
                  </option>
                ))}
              </select>
              <div className="modal-buttons">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setEditEvent(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this event?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="confirm-button">
                Yes
              </button>
              <button onClick={cancelDelete} className="cancel-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

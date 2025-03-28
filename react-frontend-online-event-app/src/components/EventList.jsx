import React from 'react';
import './EventList.css';

export default function EventList({
  events = [], // List of events to display
  admin = false, // Show admin buttons (Update, Delete) if true
  onUpdate, // Callback for updating an event
  onDelete, // Callback for deleting an event
  user = false, // Show user buttons (Register, Unregister) if true
  onRegister, // Callback for registering for an event
  onUnregister, // Callback for unregistering from an event
}) {
  return (
    <div className="event-list-container">
      {events.map((event) => (
        <div className="event-card" key={event.eventId}>
          <div className="event-card-image-wrapper">
            {event.imageUrl ? (
              <img
                className="event-card-image"
                src={event.imageUrl}
                alt={event.title}
              />
            ) : (
              <img
                className="event-card-image"
                src="https://placehold.co/600x400"
                alt="No event image"
              />
            )}
          </div>
          <div className="event-card-content">
            <h3 className="event-card-title">{event.title}</h3>
            <p className="event-card-date">
              {new Date(event.dateTime).toLocaleString()}
            </p>
            <p className="event-card-location">
              {event.location
                ? event.location.roomName
                : 'Location not specified'}
            </p>
            <p className="event-card-description">{event.description}</p>
          </div>
          {admin && (
            <div className="admin-buttons">
              <button onClick={() => onUpdate(event.eventId)}>Update</button>
              <button onClick={() => onDelete(event.eventId)}>Delete</button>
            </div>
          )}
          {user && (
            <div className="user-buttons">
              {event.isRegistered ? (
                <button onClick={() => onUnregister(event.eventId)}>
                  Unregister
                </button>
              ) : (
                <button onClick={() => onRegister(event.eventId)}>
                  Register
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

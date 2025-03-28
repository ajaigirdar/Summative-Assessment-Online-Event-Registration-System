// Profile.jsx
// Component for the profile page to display user info and registered events
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventList from '../components/EventList';
import { getRegisteredEvents, unregisterEvent } from '../services/apiService';
import './Profile.css';

const Profile = ({ user, credentials, searchTerm }) => {
  // State for managing registered events and filtered events
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch registered events and redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    if (user && credentials) {
      fetchRegisteredEvents();
    }
  }, [user, credentials, navigate]);

  // Filter registered events based on search term
  useEffect(() => {
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredEvents(
        registeredEvents.filter((event) =>
          event.title.toLowerCase().includes(lowerSearch)
        )
      );
    } else {
      setFilteredEvents(registeredEvents);
    }
  }, [searchTerm, registeredEvents]);

  const fetchRegisteredEvents = () => {
    getRegisteredEvents(credentials)
      .then((response) => {
        console.log('Fetched registered events:', response.data);
        response.data.forEach((event) => {
          console.log(
            `Event ${event.eventId}: isRegistered = ${event.isRegistered}`
          );
        });
        setRegisteredEvents(
          response.data.map((event) => ({ ...event, isRegistered: true }))
        );
      })
      .catch((error) =>
        console.error('Error fetching registered events:', error)
      );
  };

  // Handle unregistration from an event
  const handleUnregister = (eventId) => {
    console.log('Unregister clicked for event:', eventId);
    unregisterEvent(eventId, credentials)
      .then(() => {
        setRegisteredEvents(
          registeredEvents.filter((event) => event.eventId !== eventId)
        );
        fetchRegisteredEvents();
      })
      .catch((error) => console.error('Error unregistering:', error));
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <section className="user-info">
        <h2>User Information</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </section>
      <section className="registered-events">
        <h2>Your Registered Events</h2>
        {filteredEvents.length > 0 ? (
          <EventList
            events={filteredEvents}
            user={true}
            onUnregister={handleUnregister}
          />
        ) : (
          <p>You haven’t registered for any events yet.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;

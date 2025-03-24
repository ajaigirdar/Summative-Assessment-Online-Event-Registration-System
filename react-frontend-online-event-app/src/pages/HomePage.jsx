import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from '../components/EventList';
import './HomePage.css';

export default function HomePage({ user }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  // Placeholder handlers for registration
  const handleRegister = (eventId) =>
    console.log('Register for event:', eventId);
  const handleUnregister = (eventId) =>
    console.log('Unregister from event:', eventId);

  return (
    <div className="home-page">
      <h1>
        <strong>Our top picks for 2025</strong>
      </h1>
      <EventList
        events={events}
        user={!!user} // Enable user mode if logged in
        onRegister={handleRegister}
        onUnregister={handleUnregister}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import { getEvents } from '../services/apiService';
import './HomePage.css';

const HomePage = ({ user, credentials }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);
  // Fetch events from the backend
  const fetchEvents = () => {
    getEvents()
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching events:', error));
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        {' '}
        <h1>Welcome to Eventz</h1>
        <p>Discover and join exciting events near you!</p>
      </section>

      <section className="events-section">
        <h2>Our top picks for 2025</h2>{' '}
        <EventList
          events={events}
          admin={false}
          user={user}
          credentials={credentials}
        />
      </section>
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import {
  getEvents,
  registerEvent,
  unregisterEvent,
} from '../services/apiService';
import './HomePage.css';

const HomePage = ({ user, credentials, searchTerm }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchEvents(); // Always fetch events on mount
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    // Filter events based on search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredEvents(
        events.filter((event) =>
          event.title.toLowerCase().includes(lowerSearch)
        )
      );
    } else {
      setFilteredEvents(events);
    }
  }, [searchTerm, events]);

  const fetchEvents = () => {
    console.log('Fetching events with credentials:', credentials);
    getEvents(credentials)
      .then((response) => {
        console.log('Raw response:', response.data);
        response.data.forEach((event) => {
          console.log(
            `Event ${event.eventId}: isRegistered = ${event.isRegistered}`
          );
        });
        setEvents(response.data);
      })
      .catch((error) => console.error('Error fetching events:', error));
  };

  const handleRegister = (eventId) => {
    console.log('Register clicked for event:', eventId);
    console.log('Credentials:', credentials);
    registerEvent(eventId, credentials)
      .then((response) => {
        console.log('Register response:', response.data);
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.eventId === eventId ? { ...event, isRegistered: true } : event
          )
        );
        setTimeout(fetchEvents, 500);
      })
      .catch((error) => {
        console.error(
          'Register error:',
          error.response?.status,
          error.response?.data
        );
        fetchEvents();
      });
  };

  const handleUnregister = (eventId) => {
    console.log('Unregister clicked for event:', eventId);
    unregisterEvent(eventId, credentials)
      .then((response) => {
        console.log('Unregister response:', response.data);
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.eventId === eventId
              ? { ...event, isRegistered: false }
              : event
          )
        );
        setTimeout(fetchEvents, 500);
      })
      .catch((error) => {
        console.error(
          'Unregister error:',
          error.response?.status,
          error.response?.data
        );
        fetchEvents();
      });
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to Eventz</h1>
        <p>Discover and join exciting events near you!</p>
      </section>
      <section className="events-section">
        <EventList
          events={filteredEvents}
          admin={false}
          user={!!user}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
        />
      </section>
    </div>
  );
};

export default HomePage;

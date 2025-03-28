// App.jsx
// Main application component that sets up routing, session management, and search functionality
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import Profile from './pages/Profile';
import { getCurrentUser } from './services/apiService';
import './App.css';

// AppWrapper contains the main app logic, wrapped in Router for navigation
function AppWrapper() {
  // State to manage the current user (name, email, role)
  const [user, setUser] = useState(null);
  // State to manage user credentials for authenticated API calls
  const [credentials, setCredentials] = useState(null);
  // State to manage the search term for filtering events
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Restore session from localStorage on app load
  useEffect(() => {
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      const parsedCredentials = JSON.parse(storedCredentials);
      const creds = {
        username: parsedCredentials.email,
        password: parsedCredentials.password,
      };
      console.log('Restored credentials:', creds);
      setCredentials(creds);
      getCurrentUser(creds)
        .then((response) => {
          const { name, email, role } = response.data;
          setUser({ name, email, role });
        })
        .catch((error) => {
          console.error('Error restoring session:', error);
          localStorage.removeItem('userCredentials');
        });
    }
  }, []);

  // Handle logout by clearing session and redirecting to homepage
  const handleLogout = () => {
    console.log('Logging out... Current path:', window.location.pathname);
    setUser(null);
    setCredentials(null);
    localStorage.removeItem('userCredentials');
    setTimeout(() => {
      navigate('/', { replace: true });
      console.log('Navigated to /');
    }, 0);
  };

  // Update search term when the user types in the search bar
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Header user={user} onLogout={handleLogout} onSearch={handleSearch} />
      <div className="content-container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                credentials={credentials}
                searchTerm={searchTerm}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup setUser={setUser} setCredentials={setCredentials} />
            }
          />
          <Route
            path="/login"
            element={
              <Login setUser={setUser} setCredentials={setCredentials} />
            }
          />
          <Route
            path="/admin"
            element={<AdminPage credentials={credentials} />}
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                credentials={credentials}
                searchTerm={searchTerm}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

// App component wraps AppWrapper with Router for navigation
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

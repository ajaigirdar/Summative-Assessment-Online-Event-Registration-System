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

function AppWrapper() {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleLogout = () => {
    console.log('Logging out... Current path:', window.location.pathname);
    setUser(null);
    setCredentials(null);
    localStorage.removeItem('userCredentials');
    setTimeout(() => {
      navigate('/', { replace: true });
      console.log('Navigated to /');
    }, 0); // Delay to ensure state updates
  };

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

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

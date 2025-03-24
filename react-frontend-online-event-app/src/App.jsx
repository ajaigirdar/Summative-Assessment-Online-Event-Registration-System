import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setCredentials(null);
    localStorage.removeItem('userCredentials');
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />{' '}
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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

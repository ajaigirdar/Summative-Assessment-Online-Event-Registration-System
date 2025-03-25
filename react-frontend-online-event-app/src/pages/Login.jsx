import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getCurrentUser } from '../services/apiService';
import './Login.css';

// Login component receives setUser and setCredentials props from App.jsx
const Login = ({ setUser, setCredentials }) => {
  // State to manage form inputs (email and password)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  // State to display error messages if login fails
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Handler for input changes in the login form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Attempting login with:', formData);
    loginUser(formData.username, formData.password)
      .then(() => {
        getCurrentUser({
          username: formData.username,
          password: formData.password,
        })
          .then((response) => {
            const { name, email, role } = response.data;
            console.log('Login success:', response.data);
            setUser({ name, email, role });
            setCredentials({
              username: formData.username,
              password: formData.password,
            });
            localStorage.setItem(
              'userCredentials',
              JSON.stringify({
                email: formData.username,
                password: formData.password,
              })
            );
            // Redirect based on role
            navigate(role === 'ADMIN' ? '/admin' : '/');
          })
          .catch((error) => {
            setError('Failed to fetch user details after login.');
            console.error(
              'Fetch user error:',
              error.response?.status,
              error.response?.data
            );
          });
      })
      .catch((error) => {
        setError('Login failed. Check your credentials.');
        console.error(
          'Login error:',
          error.response?.status,
          error.response?.data
        );
      });
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Log In</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username / Email Address:</label>
          <input
            id="username"
            name="username"
            type="email"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p>
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// Signup.jsx
// Component for the signup page to create new user accounts
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser, getCurrentUser } from '../services/apiService';
import './Signup.css';

const Signup = ({ setUser, setCredentials }) => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // State for success/error messages
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Update form data on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to sign up
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    signupUser(formData.name, formData.email, formData.password)
      .then(() => {
        getCurrentUser({
          username: formData.email,
          password: formData.password,
        })
          .then((response) => {
            const { name, email, role } = response.data;
            setMessage('Signup successful! Redirecting...');
            setUser({ name, email, role });
            setCredentials({
              username: formData.email,
              password: formData.password,
            });
            localStorage.setItem(
              'userCredentials',
              JSON.stringify({
                email: formData.email,
                password: formData.password,
              })
            );
            setTimeout(() => navigate('/'), 1000);
          })
          .catch((error) => {
            setMessage('Failed to fetch user details after signup.');
            console.error(
              'Fetch user error:',
              error.response?.status,
              error.response?.data
            );
          });
      })
      .catch((error) => {
        setMessage(`Signup failed: ${error.response?.data || 'Unknown error'}`);
        console.error('Signup error:', error.response?.status);
      });
  };

  return (
    <div className="signup-page-bg">
      <div className="signup-form-container">
        <h2>New User Sign Up</h2>
        {message && <p className="signup-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
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

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

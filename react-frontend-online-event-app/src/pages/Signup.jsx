import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/apiService';
import './Signup.css';

const Signup = ({ setUser, setCredentials }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    signupUser(formData.name, formData.email, formData.password)
      .then((response) => {
        // Auto-login after signup
        setUser({ email: formData.email, role: 'USER' });
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
        setMessage('Signup successful! Redirecting...');
        setTimeout(() => navigate('/'), 1000);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      })
      .catch((error) => {
        setMessage(error.response?.data || 'Signup failed');
      });
  };

  return (
    <div className="signup-page-bg">
      <div className="signup-form-container">
        <h2>New User Sign Up</h2>
        {message && <p className="signup-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
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

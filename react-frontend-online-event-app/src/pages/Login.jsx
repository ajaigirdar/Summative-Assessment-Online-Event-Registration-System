// src/pages/Login.jsx
import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', loginData);
    // Handle login logic
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Username / Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';
import './Login.css';

const Login = ({ setUser, setCredentials }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Attempting login:', formData);
    loginUser(formData.username, formData.password)
      .then((response) => {
        console.log('Login success:', response.data);
        const role =
          formData.username === 'admin@eventz.com' ? 'ADMIN' : 'USER';
        setUser({ email: formData.username, role });
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
        navigate(role === 'ADMIN' ? '/admin' : '/');
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
            type="text"
            id="username"
            name="username"
            value={formData.username}
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

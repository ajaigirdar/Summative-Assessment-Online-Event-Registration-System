import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout, onSearch }) => {
  // State to manage the search input value
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input changes and pass the term to the parent component
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>
          <Link to="/">eventz</Link>
        </h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="search-icon">
          <i className="fas fa-search"></i>
        </span>
      </div>
      <nav>
        <ul className="nav-links">
          {user ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <span>Welcome, {user.name}</span>
              </li>
              <li>
                <button onClick={onLogout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

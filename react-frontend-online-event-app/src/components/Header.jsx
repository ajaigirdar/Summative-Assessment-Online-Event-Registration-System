import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Add Link
import './Header.css';

const Header = ({ user, onLogout, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>
          <Link to="/">eventz</Link> {/* Use Link instead of <a> */}
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
                <Link to="/profile">Profile</Link> {/* Use Link here too */}
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
                <Link to="/login">Log In</Link> {/* Use Link here too */}
              </li>
              <li>
                <Link to="/signup">Sign Up</Link> {/* Use Link here too */}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <h1>eventz</h1>
        </a>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search events" />
        <button>🔍</button>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/login">Log In</a>
          </li>
          <li>
            <a href="/signup">Sign Up</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

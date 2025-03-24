import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
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
          {user ? (
            <>
              <li>
                <span>Welcome, {user.email}</span>
              </li>
              {user.role === 'ADMIN' && (
                <li>
                  <a href="/admin">Admin</a>
                </li>
              )}
              <li>
                <button onClick={onLogout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login">Log In</a>
              </li>
              <li>
                <a href="/signup">Sign Up</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

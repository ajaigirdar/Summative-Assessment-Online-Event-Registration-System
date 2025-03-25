import React from 'react';
import './Header.css';

const Header = ({ user, onLogout, credentials }) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>
          <a href="/">eventz</a>
        </h1>
      </div>
      <nav>
        <ul className="nav-links">
          {user ? (
            <>
              <li>
                <span>Welcome, {user.name}</span>{' '}
                {/* Displays user's name from backend */}
              </li>
              <li>
                {/* <button onClick={onLogout}>Log Out</button> */}
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

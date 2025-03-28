// Footer.jsx
// Component for the footer displayed on all pages
import React from 'react';
import './Footer.css';

export default function Footer() {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo */}
        <div className="footer-logo">
          <h2>eventz</h2>
        </div>

        {/* Copyright Information */}
        <div className="footer-copy">
          <p>&copy; {currentYear} Eventz | All Rights Reserved</p>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-square-instagram"></i>
          </a>
          <a
            href="https://www.reddit.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-reddit"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

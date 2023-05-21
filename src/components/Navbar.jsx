// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li className="navbar-logo">
          <Link className="nav-item" to="/">Immanuel</Link>
        </li>
        <li className="navbar-options">
          <Link className="navbar-options-home" to="/">HOME</Link>
          <Link className="navbar-options-main" to="/about">MAIN</Link>
          <Link className="navbar-options-about" to="/about">ABOUT</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;

// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <section className="navbar-left">
        <Link className="nav-item" to="/">Logo</Link>
      </section>
      <section className="navbar-right">
        <Link className="nav-item" to="/">首頁</Link>
        <Link className="nav-item" to="/about">關於我們</Link>
      </section>
    </nav>
  )
}

export default Navbar;

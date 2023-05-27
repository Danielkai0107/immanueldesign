// Navbar.js
import React, { memo, useState }from 'react';
import { Link } from 'react-router-dom';

function Navbar({handleBurgerClick}) {

  const [isExpand, setIsExpand] = useState(false);
  
  const handleClick =()=>{
    setIsExpand(!isExpand)
  }

  return (
    <nav className="navbar" >
      <ul>
        <li className="navbar-logo">
          <Link className="nav-item" to="/">Immanuel</Link>
        </li>
        <li className="navbar-options">
          <Link className="navbar-options-home" to="/">HOME</Link>
          <Link className="navbar-options-main" to="/Main">MAIN</Link>
          <Link className="navbar-options-about" to="/About">ABOUT</Link>
        </li>
        <li className={`navbar-sm-btn ${isExpand ? 'expanded' : ''}`} onClick={handleClick}>
          <span></span>
          <span></span>
        </li>
      </ul>
      {isExpand && (
        <section className="navbar-sm-options">
            <Link className="navbar-options-home" to="/" onClick={handleClick}>HOME</Link>
            <Link className="navbar-options-main" to="/Main" onClick={handleClick}>MAIN</Link>
            <Link className="navbar-options-about" to="/About" onClick={handleClick}>ABOUT</Link>
        </section>
      )}
      
    </nav>
  )
}

export default memo(Navbar);

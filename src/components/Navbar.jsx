// Navbar.js
import React, { memo, useState }from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({totalSelected}) {

  const navigate = useNavigate();

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
          <div className="cart-btn" onClick={() => navigate('/Cart')}>
            <a></a>
            {totalSelected > 0 && <span>({totalSelected})</span>}
          </div>
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

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
          <Link className="navbar-options-home" to="/"><span className='home-icon'></span>Home</Link>
          <Link className="navbar-options-main" to="/Main"><span className='deco-icon'></span>Decorate</Link>
          <Link className="navbar-options-main" to="/Cart"><span className='cart-icon'></span>Contact
          {totalSelected > 0 && <span className='red-dot'>{totalSelected}</span>}
          </Link>
        </li>
        <li className='navbar-sm'>
          <section className="main-btn" onClick={() => navigate('/Main')}>
            <figure></figure>
          </section>
          <section className="cart-btn" onClick={() => navigate('/Cart')}>
            <figure></figure>
            {totalSelected > 0 && <span>{totalSelected}</span>}
          </section>
          
          {/* <section className={`menu-btn ${isExpand ? 'expanded' : ''}`} onClick={handleClick}>
            <span></span>
            <span></span>
          </section> */}
        </li>
      </ul>
      {/* {isExpand && (
        <section className="navbar-sm-options">
            <Link className="navbar-options-home" to="/" onClick={handleClick}>首頁</Link>
            <Link className="navbar-options-main" to="/Main" onClick={handleClick}>開始佈置</Link>
        </section>
      )} */}
    </nav>
  )
}

export default memo(Navbar);

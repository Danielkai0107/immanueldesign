// Navbar.js
import React, { memo }from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({totalSelected,isNavbar,setIsNavbar,handleScreenshot}) {

  const navigate = useNavigate();
  
  const handleCartClick =()=>{
    navigate('/Cart')
    setIsNavbar(1)
    handleScreenshot()
  }

  const handleMainClick =()=>{
    navigate('/Main')
    setIsNavbar(0)
  }

  return (
    <nav className="navbar" >
      <ul>
        <li className="navbar-logo">
          <figure></figure>
          <Link className="nav-item" to="/" onClick={()=>{setIsNavbar(0)}}>AlwaysGreenLife</Link>
        </li>
        <li className="navbar-options">
          <Link className="navbar-options-home" to="/">首頁</Link>
          <Link className="navbar-options-main" to="/Main">我的佈置</Link>
          <Link className="navbar-options-main" to="/Cart" onClick={handleScreenshot}>商城</Link>
          <Link className="navbar-options-main" to="/ShopCart" onClick={handleScreenshot}>購物車
          {totalSelected > 0 && <span className='red-dot'>{totalSelected}</span>}
          </Link>
        </li>
        <li className='navbar-sm'>

          {isNavbar ===0 &&
          <section className="cart-btn" onClick={handleCartClick}>
              <figure></figure>
            {totalSelected > 0 && <span>{totalSelected}</span>}
          </section>}
          {isNavbar ===1 &&
          <section className="main-btn" onClick={handleMainClick}>
              <figure></figure>
          </section>}
          
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

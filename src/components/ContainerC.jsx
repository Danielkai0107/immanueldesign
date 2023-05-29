import React from 'react';
import { Link } from 'react-router-dom';


function ContainerC({ totalPrice, totalSelected ,handleScreenshot}) {




return (
  <section className="containerC">
    <ul className='price-container'>
      <p>佈置總金額：</p>
      <section className="total-price">${totalPrice}</section>
    </ul>
    <ul className='second-container'>
      <li className='info'>
        <h3 className="total-num">共計 {totalSelected} 項</h3>
        <p>＊包含進、撤場佈置服務</p>
        <p>＊所有道具為出租模式</p>
      </li>
      <li className='Connect' >
        <Link to='/Cart' onClick={handleScreenshot}>立即預約檔期</Link>
      </li>
    </ul>
  </section>
)
}

export default ContainerC

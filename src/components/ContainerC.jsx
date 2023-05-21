// ContainerC.js
import React, { useState } from 'react'

function ContainerC({ handleBackgroundChange, handleClearSelect, totalPrice, totalSelected }) {

  const [selectedOption, setSelectedOption] = useState("bg-image-1");

  const handleClick = (option) => {
    handleBackgroundChange(option);
    setSelectedOption(option);
  };

  return (
    <section className="containerC">
      <ul className='bgcChanger'>
        <li>
          <span
            className={selectedOption === "bg-image-1" ? "selected" : ""}
            onClick={() => handleClick('bg-image-1')}
          >
          </span>
          <span
            className={selectedOption === "bg-image-2" ? "selected" : ""}
            onClick={() => handleClick('bg-image-2')}
          >
          </span>
        </li>
        <li className='price-container'>
          <p>佈置總金額：</p>
          <section className="total-price">${totalPrice}</section>
        </li>

      </ul>
      <ul className='second-container'>
        <li className='info'>
          <h3 className="total-num">共計 {totalSelected} 項</h3>
          <p>＊皆包含進、撤場佈置服務</p>
          <p>＊皆為道具出租</p>
          <p>＊選定後請截圖傳送至官方line@預約檔期</p>
        </li>
        <li className='priceAndConnect'>
          <span>立即預約檔期</span>
        </li>
      </ul>
    </section>
  )
}

export default ContainerC

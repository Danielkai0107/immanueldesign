import React from 'react'

function ContainerC({ handleBackgroundChange, handleClearSelect, totalPrice, totalSelected }) {
  return (
  <li className="containerC">
    <section>
      <button onClick={() => handleBackgroundChange('bg-image-1')}>背景1</button>
      <button onClick={() => handleBackgroundChange('bg-image-2')}>背景2</button>
      <button onClick={handleClearSelect}>清空</button>
    </section>
    <div className="total-price">總價: {totalPrice}</div>
    <div className="total-price">共 {totalSelected} 項</div>
    <button>我要訂購，聯絡我們</button>
  </li>
  )
}

export default ContainerC

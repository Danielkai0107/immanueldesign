// ContainerC.js
import React from 'react'

function ContainerC({ handleBackgroundChange, handleClearSelect, totalPrice, totalSelected, selectedProducts }) {

  async function handleSubmitOrder() {
    const response = await fetch('http://localhost:3000/send-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedProducts: selectedProducts,
      }),
    });

    if (response.ok) {
      console.log('訂單已經成功傳送！');
    } else {
      console.error('訂單傳送失敗！');
    }
  }

  return (
  <li className="containerC">
    <section>
      <button onClick={() => handleBackgroundChange('bg-image-1')}>背景1</button>
      <button onClick={() => handleBackgroundChange('bg-image-2')}>背景2</button>
      <button onClick={handleClearSelect}>清空</button>
    </section>
    <div className="total-price">總價: {totalPrice}</div>
    <div className="total-price">共 {totalSelected} 項</div>
    <button onClick={handleSubmitOrder}>下訂單</button>
  </li>
  )
}

export default ContainerC

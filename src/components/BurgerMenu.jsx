//BurgerMenu.js
import React from 'react'

function BurgerMenu({handleBurgerClick,handleRemoveProduct,selectedProducts,totalPrice,totalSelected,burgerOpen}) {
  return (
    <article className={burgerOpen ? 'burger':'burger-hidden'}>
      <ul className='burger-menu'>
        <li className='title'>我的道具：</li>
        {selectedProducts.map(product => (
          <li className='name' key={product.id}>
            <p>{product.name} 
              <h5>${product.price}</h5>
            </p>
            <div onClick={() => handleRemoveProduct(product.id)}>
              <span></span>
            </div>
          </li>
        ))}
        <li className='num'>共計 {totalSelected} 項</li>
        <li className='price'>${totalPrice}</li>
        {selectedProducts.length > 0 && <li className='Connect'>
          <span>立即預約檔期</span>
        </li>}
      </ul>
      <figure className='close-area' onClick={handleBurgerClick}></figure>
    </article>
    
  )
}

export default BurgerMenu

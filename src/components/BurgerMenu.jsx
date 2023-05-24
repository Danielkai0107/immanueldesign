import React from 'react'

function BurgerMenu({totalPrice,totalSelected,burgerOpen}) {
  return (
    <article className={burgerOpen ? 'burger':'burger-hidden'}>
      <ul className='burger-menu'>
      </ul>
    </article>
    
  )
}

export default BurgerMenu

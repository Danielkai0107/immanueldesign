//ShopCart.js
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ShopCart({handleRemoveProduct,selectedProducts,totalSelected,totalPrice,setIsNavbar}) {

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [info, setInfo] = useState('');
  const [transport, setTransport] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSending, setIsSending] = useState(false);

// 创建一个处理点击事件的函数
const handleNotify = async (event) => {
  event.preventDefault();
  if (selectedProducts.length === 0) {
    setMessage('您尚未選擇商品');
    setTimeout(() => setMessage(''), 3000);
    return;
  }
  
  if (name === '') {
    setMessage('請輸入姓名');
    setTimeout(() => setMessage(''), 3000);
    return;
  }

  if (phone === '') {
    setMessage('請輸入手機號碼');
    setTimeout(() => setMessage(''), 3000);
    return;
  }

  let totalprice = 0;
  let productMessage = selectedProducts.map(product => {
    totalprice += product.price;
    return `${product.name} ${product.variants[product.selectedVariantIndex].info}`;
  }).join('\n');
  
  // 在發送請求之前，將 isSending 設定為 true
  setIsSending(true);

  try {
    const response = await axios.post('/api/notify', {
      message: `\n姓名：${name}\n佈置日期：${time}\n手機號碼：${phone}\n電子信箱：${email}\n${productMessage}\nTotal Price: ${totalprice}`,
    });

    console.log(response.data);
    setSuccess('傳送成功\n剩下最後一步了');
    setTimeout(() => setSuccess(''), 5000);
    setName('')
    setTime('')
    setPhone('')
    setEmail('')
  } catch (error) {
    console.error(error);
    setError('傳送有誤\n請直接加入好友詢問喔');
    setTimeout(() => setError(''), 5000);
  } finally {
    // 無論請求成功還是失敗，最後都需要將 isSending 設定為 false
    setIsSending(false);
  }
};


useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  return (
    <article className='shopCart'>
      <section className='cart-info'>
      <h1>購物清單</h1>
        <ul>
          <li></li>
        </ul>
      </section>
      <section className='pay-info'>
      <h1>帳單資訊</h1>
      <ul className=''>
          <form onSubmit={handleNotify}>
            <li>
              <label htmlFor="">姓名 *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="" />
            </li>
            <li>
              <label htmlFor="">聯絡電話 *</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="" />
            </li>
            <li>
              <label htmlFor="">電子信箱 *</label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="" />
            </li>
            <li>
              <label htmlFor="">送達日期、時間 *</label>
              <input type="date" value={time} onChange={e => setTime(e.target.value)} placeholder="" />
            </li>
            <li>
              <label htmlFor="">運送地址 *</label>
              <input type="date" value={address} onChange={e => setAddress(e.target.value)} placeholder="" />
            </li>
            <li>
              <label htmlFor="">訂單備註 *</label>
              <input type="date" value={info} onChange={e => setInfo(e.target.value)} placeholder="" />
            </li>
            <li>
              <label htmlFor="">運送方式 *</label>
              <input type="date" value={transport} onChange={e => setTransport(e.target.value)} placeholder="" />
            </li>
            <li>
            你的個人資訊將被用於訂購商品以及運送商品上，不會轉交於第三方機構使用。若要了解更詳盡的訊息，可參考我們的 隱私權政策，謝謝。
            </li>
            <li>
            我已閱讀並同意網站的〈條款與條件〉*
            </li>
            <button type="submit" >確認下單</button>
          </form>
      </ul>
      </section>
    </article>
  )
}

export default ShopCart

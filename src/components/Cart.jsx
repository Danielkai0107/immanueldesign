//Cart.js
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Cart({handleRemoveProduct,selectedProducts,totalSelected,totalPrice,setIsNavbar}) {

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
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
    <article className='cart'>
      <ul className='header'>
        <li className='back-btn'>
          <span></span>
          <Link to='/Main' onClick={()=>{setIsNavbar(0)}}>返回我的佈置</Link>
        </li>
        <li className='title'>
          <p>輕鬆預約三步驟</p>
        </li>
      </ul>
      <ul className='context'>
        <p className='step'>Step 1 -- <span>我設計的內容</span></p>
        <li className='info'>
        {selectedProducts.length === 0 && <Link className="start-btn" to="/Main" onClick={()=>{setIsNavbar(0)}}>開始佈置</Link>}
        {selectedProducts.map((product) => (
          <section key={product.id} className='selected-item'>
            <p>{product.name}-{product.variants[product.selectedVariantIndex].info}</p>
            <span onClick={()=>{handleRemoveProduct(product.id)}}></span>
          </section>
        ))}
          <section className='number'>共計{totalSelected}項</section>
          <section className='price'><span>佈置金額：</span>＄{totalPrice}</section>
        </li>
        <p className='step'>Step 2 -- <span>將設計傳給我們</span></p>
        <li className='context-container'>
          <form onSubmit={handleNotify}>
            <label htmlFor="">姓名：<span>(必填)</span></label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="" />
            <label htmlFor="">手機號碼：<span>(訂單編號-必填)</span></label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="" />
            <label htmlFor="">佈置日期：</label>
            <input type="date" value={time} onChange={e => setTime(e.target.value)} placeholder="" />
            <label htmlFor="">電子郵件：</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="" />
            <button type="submit" >送出</button>
          </form>
          <p className='step'>Step 3 -- <span>加入好友，確認細節</span></p>
          <section className='line'>
            <a className='line-btn' href="https://lin.ee/8phpLYwB">
              <img src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png" alt="加入好友"/>
            </a>
            <img className='QRcode' src="https://qr-official.line.me/gs/M_802ygcsd_GW.png" alt="QRcode"/>
          </section>
          <p className='step'></p>
        </li>
      </ul>
      <section className='msg'>
          {message !== '' && <p className='window-msg'>{message}</p>}
          {success !== '' && <p className='window-msg'>
            {success.split('\n').map((item, i) => { return <span key={i}>{item}</span>;})}</p>}
          {error !== '' && <p className='window-msg error'>
            {error.split('\n').map((item, i) => { return <span key={i}>{item}</span>;})}</p>}
        </section>
        {isSending && <section className='sending'>
          <p>傳送中</p>
          <p>先別離開喔</p>
          <figure></figure>
          <span></span>
        </section>}
    </article>
  )
}

export default Cart

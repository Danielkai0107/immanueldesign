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

// 创建一个处理点击事件的函数
const handleNotify = async (event) => {
  event.preventDefault(); // 阻止表单的默认提交行为
  // 确保有选择产品
  if (selectedProducts.length === 0) {
    setMessage('尚未選擇商品');
    setTimeout(() => setMessage(''), 3000);
    return;
  }
  
  // 获取用户姓名
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
  
  // 创建发送的消息内容
  let totalprice = 0;
  let productMessage = selectedProducts.map(product => {
    totalprice += product.price;
    return `${product.name} ${product.variants[product.selectedVariantIndex].info}`;
  }).join('\n');
  
  try {
    // 发送一个POST请求到你的后端服务器
    const response = await axios.post('/api/notify', {
      message: `\n姓名：${name}\n佈置日期：${time}\n手機號碼：${phone}\n電子信箱：${email}\n${productMessage}\nTotal Price: ${totalprice}`,
    });

    console.log(response.data); // 在控制台打印响应数据以供调试

    setSuccess('耶～傳送成功\n剩下最後一步了');
    setTimeout(() => setSuccess(''), 5000);
    setName('')
    setTime('')
    setPhone('')
    setEmail('')
  } catch (error) {
    console.error(error); // 如果出现错误，将其打印到控制台

    setError('傳送有誤\n直接加入好友詢問喔');
    setTimeout(() => setError(''), 5000);
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
            {success.split('\n').map((item, i) => { return <p key={i}>{item}</p>;})}</p>}
          {error !== '' && <p className='window-msg'>
            {error.split('\n').map((item, i) => { return <p key={i}>{item}</p>;})}</p>}
        </section>
    </article>
  )
}

export default Cart

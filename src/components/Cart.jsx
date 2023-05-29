import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Cart({selectedProducts,totalSelected,totalPrice}) {

  const navigate = useNavigate();

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
    setMessage('請選擇商品');
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
    const response = await axios.post('https://localhost:3001/notify', {
      message: `\n姓名：${name}\n佈置日期：${time}\n手機號碼：${phone}\n電子信箱：${email}\n${productMessage}\nTotal Price: ${totalprice}`,
    });

    console.log(response.data); // 在控制台打印响应数据以供调试

    setSuccess('發送成功');
    setTimeout(() => setSuccess(''), 3000);
  } catch (error) {
    console.error(error); // 如果出现错误，将其打印到控制台

    setError('發送失敗');
    setTimeout(() => setError(''), 3000);
  }
};

  return (
    <article className='cart'>
      <ul className='btn'>
        <li>
          <Link className='back-btn' onClick={() => navigate(-1)}></Link>
        </li>
      </ul>
      <ul className='context'>
        <li className='form'>
          <p className='error'>{message}</p>
          <p className='error'>{success}</p>
          <p className='error'>{error}</p>
          <form onSubmit={handleNotify}>
            <label htmlFor="">姓名：<span>(必填)</span></label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="" />
            <label htmlFor="">手機號碼：<span>(必填)</span></label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="" />
            <label htmlFor="">佈置日期：</label>
            <input type="date" value={time} onChange={e => setTime(e.target.value)} placeholder="" />
            <label htmlFor="">電子郵件：</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="" />
            <button type="submit">送出</button>
          </form>
        </li>
        <li className='info'>
        <a href="https://lin.ee/8phpLYwB">
          <img src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png" alt="加入好友" height="36" border="0"/>
        </a>
        <img src="https://qr-official.line.me/gs/M_802ygcsd_GW.png" alt="QRcode"/>
        <section>{totalPrice}</section>
        <section>{totalSelected}</section>
        </li>
      </ul>
    </article>
  )
}

export default Cart

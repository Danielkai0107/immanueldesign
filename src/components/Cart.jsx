import axios from 'axios';
import React, { useState } from 'react'

function Cart({selectedProducts,handleCartExpand}) {

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

// 创建一个处理点击事件的函数
const handleNotify = async (event) => {
  event.preventDefault(); // 阻止表单的默认提交行为
  
  // 确保有选择产品
  if (selectedProducts.length === 0) {
    setMessage('請選擇商品');
    setTimeout(() => setMessage(''), 5000);
    return;
  }
  
  // 获取用户姓名
  if (name === '') {
    setMessage('請輸入姓名');
    setTimeout(() => setMessage(''), 5000);
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
    const response = await axios.post('http://locallhost:3001/notify', {
      message: `\n姓名：${name}\n佈置日期：${time}\n手機號碼：${phone}\n電子信箱：${email}\n${productMessage}\nTotal Price: ${totalprice}`,
    });

    console.log(response.data); // 在控制台打印响应数据以供调试

    setMessage('發送成功');
    setTimeout(() => setMessage(''), 5000);
  } catch (error) {
    console.error(error); // 如果出现错误，将其打印到控制台

    setMessage('發送失敗');
    setTimeout(() => setMessage(''), 5000);
  }
};

  return (
    <section className='connect-info'>
      <span className='close-btn' onClick={handleCartExpand}></span>
      <p className='error'>{message}</p>
      <form onSubmit={handleNotify}>
        <label htmlFor="">姓名：</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="請輸入姓名" />
        <label htmlFor="">日期：</label>
        <input type="date" value={time} onChange={e => setTime(e.target.value)} placeholder="請輸入佈置日期" />
        <label htmlFor="">手機號碼：</label>
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="請輸入手機號碼" />
        <label htmlFor="">電子郵件：</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="請輸入電子郵件" />
        <button type="submit">送出</button>
      </form>
    </section>
  )
}

export default Cart

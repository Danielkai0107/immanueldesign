// ContainerC.js
import React, { useState } from 'react'
import axios from 'axios';
function ContainerC({ totalPrice, totalSelected ,selectedProducts}) {
// 添加Line Notify的token

const [name, setName] = useState('');
const [message, setMessage] = useState('');
// 创建一个处理点击事件的函数
const handleNotify = async () => {
  // 确保有选择产品
  if (selectedProducts.length === 0) {
    setMessage('請選擇商品');
    setTimeout(() => setMessage(''), 5000);
    return;
  }

  // 获取用户姓名
  let userInput = window.prompt("请输入您的姓名", "");
  if (userInput === null || userInput === "") {
    setMessage('請輸入姓名');
    setTimeout(() => setMessage(''), 5000);
    return;
  }

  setName(userInput);

  // 创建发送的消息内容
  let totalprice = 0;
  let productMessage = selectedProducts.map(product => {
    totalprice += product.price;
    return `${product.name} ${product.variants[product.selectedVariantIndex].info}`;
  }).join('\n');
  
  try {
    // 发送一个POST请求到你的后端服务器
    const response = await axios.post('http://localhost:3001/notify', {
      message: `${userInput}\n${productMessage}\nTotal Price: ${totalprice}`,
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
    <section className="containerC">
      <ul className='price-container'>
        <p>佈置總金額：</p>
        <section className="total-price">${totalPrice}</section>
      </ul>
      <ul className='second-container'>
        <li className='info'>
          <h3 className="total-num">共計 {totalSelected} 項</h3>
          <p>＊包含進、撤場佈置服務</p>
          <p>＊所有道具為出租模式</p>
        </li>
        <li className='Connect'>
          <span onClick={handleNotify}> 立即預約檔期</span>
        </li>
      </ul>
    </section>
  )
}

export default ContainerC

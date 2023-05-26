// 引入需要的库
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
require('dotenv').config();

// 创建一个Express应用
const app = express();

// 使用CORS中间件来处理跨域请求
app.use(cors());

// 使用 Helmet 中间件增强 HTTP 头的安全性
app.use(helmet());

// 使用 express-rate-limit 中间件限制请求速率
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// 解析请求体的中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 从环境变量中获取你的Line Notify Token
const lineNotifyToken = process.env.LINE_NOTIFY_TOKEN;

// 创建一个端点来处理发送到Line Notify的请求
app.post('/notify', async (req, res) => {
  try {
    // 创建一个POST请求的选项对象
    const options = {
      method: 'post',
      url: 'https://notify-api.line.me/api/notify',
      headers: {
        'Authorization': `Bearer ${lineNotifyToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `message=${req.body.message}`, // 将请求体中的消息用作Line Notify的消息
    };

    // 发送POST请求
    const response = await axios(options);
    
    // 将Line Notify的响应发送回客户端
    res.send(response.data);
  } catch (error) {
    // 如果出现错误，将其发送回客户端
    res.status(500).send({ error: error.toString() });
  }
});

// 开始监听3001端口
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

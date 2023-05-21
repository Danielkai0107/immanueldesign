//server.js

const express = require('express');
const line = require('@line/bot-sdk');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = {
  channelAccessToken: '你的Channel Access Token',
  channelSecret: '你的Channel Secret',
};

const client = new line.Client(config);

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const echo = { type: 'text', text: event.message.text };
  return client.replyMessage(event.replyToken, echo);
}

app.post('/send-order', (req, res) => {
  const { selectedProducts } = req.body;

  let message = '新訂單:\n';
  selectedProducts.forEach(product => {
    message += `- ${product.name}\n`;
  });

  return client.pushMessage('1661187151', { type: 'text', text: message })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.listen(3000, () => {
  console.log('listening on 3000');
});

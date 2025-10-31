const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', async (req,res) => {
  const response = await fetch('http://be-service:8080/products');
  const products = await response.json();

  let html = `
  <html>
  <head>
    <title>Cool Marketplace</title>
    <link rel="stylesheet" href="/public/style.css">
    <script src="/public/script.js"></script>
  </head>
  <body>
  <div class="container"><h1>Cool Marketplace</h1>
  `;

  products.forEach(p => {
    html += `
    <div class="card">
      <img src="${p.img}" width="100" height="100" />
      <div>
        <h2>${p.name}</h2>
        <p>${p.description}</p>
        <p>Price: $${p.price}</p>
        <button onclick="order(${p.id})">Order</button>
      </div>
    </div>`;
  });

  html += `</div></body></html>`;
  res.send(html);
});

const PORT = 80;
app.listen(PORT, ()=>console.log("Frontend running on port 80"));

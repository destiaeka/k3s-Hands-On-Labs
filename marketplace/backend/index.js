const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let orders = [];

const products = [
  { id: 1, name: 'Laptop Pro', price: 1500, img: 'https://via.placeholder.com/150', description: 'Laptop canggih untuk produktivitas.' },
  { id: 2, name: 'Smartphone X', price: 800, img: 'https://via.placeholder.com/150', description: 'Smartphone stylish dan cepat.' },
  { id: 3, name: 'Headphone Z', price: 200, img: 'https://via.placeholder.com/150', description: 'Headphone dengan suara jernih.' }
];

// API: daftar produk
app.get('/products', (req, res) => res.json(products));

// API: detail produk
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if(!product) return res.status(404).json({error: "Product not found"});
  res.json(product);
});

// API: buat order
app.post('/orders', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id == productId);
  if(!product) return res.status(404).json({error: "Product not found"});
  const order = { id: orders.length+1, product, quantity };
  orders.push(order);
  res.json(order);
});

// API: daftar order
app.get('/orders', (req,res)=> res.json(orders));

const PORT = 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

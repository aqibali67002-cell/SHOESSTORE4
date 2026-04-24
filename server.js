

/* ================= BACKEND ================= */

const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const PRODUCT_FILE = 'data.json';
const ORDER_FILE = 'orders.json';

function read(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
}

function save(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// PRODUCTS
app.post('/add-product', (req, res) => {
  let data = read(PRODUCT_FILE);
  const newProduct = { id: Date.now(), ...req.body };
  data.push(newProduct);
  save(PRODUCT_FILE, data);
  res.send('Added');
});

app.get('/products', (req, res) => {
  res.json(read(PRODUCT_FILE));
});

app.delete('/delete/:id', (req, res) => {
  let data = read(PRODUCT_FILE);
  data = data.filter(p => p.id != req.params.id);
  save(PRODUCT_FILE, data);
  res.send('Deleted');
});

// ORDERS
app.post('/order', (req, res) => {
  let orders = read(ORDER_FILE);
  const newOrder = { id: Date.now(), ...req.body };
  orders.push(newOrder);
  save(ORDER_FILE, orders);
  res.send('Order Placed');
});

app.listen(3000, () => console.log('Server Running'));



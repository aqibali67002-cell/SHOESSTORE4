let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function loadProducts() {
  const res = await fetch('/products');
  const data = await res.json();

  document.getElementById('products').innerHTML = data.map(p => `
    <div class="card">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.price} PKR</p>

      <button class="add" onclick="addToCart('${p.name}', '${p.price}')">Add to Cart</button>
      <button class="delete" onclick="deleteProduct('${p.id}')">Delete</button>
    </div>
  `).join('');
}

async function addProduct() {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').value;
  const description = document.getElementById('desc').value;

  await fetch('/add-product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, image, description })
  });

  loadProducts();
}

async function deleteProduct(id) {
  await fetch('/delete/' + id, { method: 'DELETE' });
  loadProducts();
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to Cart');
}

loadProducts();
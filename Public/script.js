async function addProduct() {
  const name = document.getElementById('name').value.trim();
  const sku = document.getElementById('sku').value.trim();
  const category = document.getElementById('category').value.trim();
  const stock = document.getElementById('stock').value.trim();

  if (!name || !sku || !category || !stock) {
    alert("Please fill all product fields.");
    return;
  }

  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, sku, category, initial_stock: stock })
  });

  if (!res.ok) {
    const err = await res.json();
    alert(`Error: ${err.error}`);
    return;
  }

  // Clear input fields
  document.getElementById('name').value = '';
  document.getElementById('sku').value = '';
  document.getElementById('category').value = '';
  document.getElementById('stock').value = '';

  await loadProducts();
}

async function loadProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();
  const list = document.getElementById('productList');
  const select = document.getElementById('productSelect');

  list.innerHTML = '';
  select.innerHTML = '';
  products.forEach(p => {
    list.innerHTML += `<li>${p.name} (${p.sku}) - ${p.current_stock}</li>`;
    select.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });

  if (products.length > 0) {
    document.getElementById('productSelect').value = products[0].id;
    loadHistory(products[0].id);
  }
}

async function addTransaction() {
  const product_id = document.getElementById('productSelect').value;
  const type = document.getElementById('type').value;
  const quantity = document.getElementById('quantity').value.trim();

  if (!quantity || quantity <= 0) {
    alert("Enter a valid quantity.");
    return;
  }

  const res = await fetch('/api/transactions',{
    method: 'POST',
    headers: {'content-Type':'application/json'},
    body: JSON.stringify({product_id,type,quantity})
    
  });

  if(!res.ok){
    const err = await res.json();
    alert(Error:${err.errror});
    return;
  }

  document.getElementById('quantity').value = ";
    

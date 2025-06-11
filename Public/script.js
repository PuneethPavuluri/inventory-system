  const productForm = document.getElementById('product-form');
  const productTableBody = document.getElementById('product-table-body');
  const transactionForm = document.getElementById('transaction-form');
  const transactionProductSelect = document.getElementById('transaction-product');
  const transactionType = document.getElementById('transaction-type');
  const transactionQuantity = document.getElementById('transaction-quantity');
  const historyProductSelect = document.getElementById('history-product');
  const transactionHistoryList = document.getElementById('transaction-history');

  // Fetch and display all products
  async function loadProducts() {
    const res = await fetch('/api/products');
    const products = await res.json();

    // Clear tables and selects
    productTableBody.innerHTML = '';
    transactionProductSelect.innerHTML = '';
    historyProductSelect.innerHTML = '';

    products.forEach(product => {
      // Add to product table
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.sku}</td>
        <td>${product.category}</td>
        <td>${product.current_stock}</td>
        <td>
          <button onclick="loadTransactionHistory('${product.id}')">📄 History</button>
        </td>
      `;
      productTableBody.appendChild(row);

      // Add to dropdowns
      const option1 = new Option(product.name, product.id);
      const option2 = new Option(product.name, product.id);
      transactionProductSelect.add(option1);
      historyProductSelect.add(option2);
    });
  }

  // Add a new product
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const sku = document.getElementById('sku').value;
    const category = document.getElementById('category').value;
    const stock = parseInt(document.getElementById('stock').value);

    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, sku, category, current_stock: stock })
    });

    productForm.reset();
    loadProducts();
  });

  // Handle transactions (IN/OUT)
  transactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const product_id = transactionProductSelect.value;
    const type = transactionType.value;
    const quantity = parseInt(transactionQuantity.value);

    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id, type, quantity })
    });

    transactionForm.reset();
    loadProducts();
  });

  // Load transaction history
  async function loadTransactionHistory(productId) {
    const res = await fetch(`/api/transactions/${productId}`);
    const history = await res.json();

    transactionHistoryList.innerHTML = '';
    history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    history.forEach(tx => {
      const li = document.createElement('li');
      li.textContent = `${tx.type} ${tx.quantity} on ${new Date(tx.timestamp).toLocaleString()}`;
      transactionHistoryList.appendChild(li);
    });

    historyProductSelect.value = productId;
  }

  // Load history when changing dropdown
  historyProductSelect.addEventListener('change', (e) => {
    const productId = e.target.value;
    if (productId) {
      loadTransactionHistory(productId);
    }
  });

  // Initial load
  loadProducts();

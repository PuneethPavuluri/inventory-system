const express = require('express');
const router = express.Router();
const { products, transactions } = require('../data/db');

// Record transaction
router.post('/', (req, res) => {
  const { product_id, type, quantity } = req.body;
  const product = products.find(p => p.id === product_id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  const change = type === 'IN' ? quantity : -quantity;
  product.current_stock += change;

  const newTransaction = {
    id: Date.now().toString(),
    product_id,
    type,
    quantity,
    timestamp: new Date().toISOString()
  };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// Get transaction history for a product
router.get('/:product_id', (req, res) => {
  const { product_id } = req.params;
  const history = transactions.filter(t => t.product_id === product_id);
  res.json(history);
});

module.exports = router;

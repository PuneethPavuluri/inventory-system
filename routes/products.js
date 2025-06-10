const express = require('express');
const router = express.Router();
const { products } = require('../data/db');

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Add new product
router.post('/', (req, res) => {
  const { name, sku, category, current_stock } = req.body;
  const newProduct = {
    id: Date.now().toString(),
    name,
    sku,
    category,
    current_stock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;

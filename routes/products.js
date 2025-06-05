const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Import the products array from data/products.js
let products = require('../data/products');

// POST /api/products - Create new product
router.post('/', (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const product = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(product);
  res.status(201).json(product);
});

// GET /api/products - Get all products
router.get('/', (req, res) => {
  res.status(200).json(products);
});

// GET /api/products/:id - Get product by id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json(product);
});

// PUT /api/products/:id - Update product by id
router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const updatedProduct = {
    ...products[index],
    ...req.body,
    id: req.params.id
  };

  products[index] = updatedProduct;
  res.status(200).json(updatedProduct);
});

// DELETE /api/products/:id - Delete product by id
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deletedProduct = products.splice(index, 1)[0];
  res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
});

module.exports = router;

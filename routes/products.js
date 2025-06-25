const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError } = require('../utils/errors');
const products = require('../models/productData');

// GET all products (with optional category filter & pagination)
router.get('/', (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  let results = [...products];
  if (category) {
    results = results.filter(p => p.category === category);
  }
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + parseInt(limit));
  res.json(paginated);
});

// GET product by ID
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// CREATE product
router.post('/', validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// UPDATE product
router.put('/:id', validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  products[index] = { id: req.params.id, ...req.body };
  res.json(products[index]);
});

// DELETE product
router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

// SEARCH by name
router.get('/search/:name', (req, res) => {
  const keyword = req.params.name.toLowerCase();
  const found = products.filter(p => p.name.toLowerCase().includes(keyword));
  res.json(found);
});

// GET stats - count by category
router.get('/stats/count-by-category', (req, res) => {
  const counts = {};
  for (let product of products) {
    counts[product.category] = (counts[product.category] || 0) + 1;
  }
  res.json(counts);
});

module.exports = router;
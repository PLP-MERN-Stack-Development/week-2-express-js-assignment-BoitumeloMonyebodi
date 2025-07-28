import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import products from '../models/productModel.js';
import auth from '../middleware/auth.js';
import { validateProduct } from '../middleware/validateProduct.js';

const router = express.Router();

// GET all products (with filter, pagination, search)
router.get('/', (req, res) => {
  let result = [...products];

  const { category, search, page = 1, limit = 5 } = req.query;

  if (category) {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const start = (page - 1) * limit;
  const end = start + Number(limit);
  const paginated = result.slice(start, end);

  res.json({ total: result.length, data: paginated });
});

// GET by ID
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next({ status: 404, message: 'Product not found' });
  res.json(product);
});

// POST create
router.post('/', auth, validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update
router.put('/:id', auth, validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: 'Product not found' });

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE
router.delete('/:id', auth, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

// GET statistics
router.get('/stats/category-count', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

export default router;
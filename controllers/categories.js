const express = require('express');
const { Category } = require('../models');
require('dotenv/config');

const router = express.Router();

router.get('/', async (_req, res) => {
  const categories = await Category.findAll();
  return res.status(200).json(categories);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const newCategory = await Category.create({ name });
  return res.status(201).json(newCategory);
});

module.exports = router;
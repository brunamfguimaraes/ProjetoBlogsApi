const express = require('express');
const { Category } = require('../models');

require('dotenv/config');

// HTTP status codes
const HTTP = {
  Created: 201,
  BadRequest: 400,
};

const router = express.Router();

// Requisito 6
router.get('/', async (_req, res) => {
  const categories = await Category.findAll();
  
  return res.status(200).json(categories);
});

// Requisito 5
router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(HTTP.BadRequest).json({ message: '"name" is required' });
 
  const newCategory = await Category.create({ name });

  return res.status(HTTP.Created).json(newCategory);
});

module.exports = router; 
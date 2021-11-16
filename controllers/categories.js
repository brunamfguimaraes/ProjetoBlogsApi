const express = require('express');
const { Category } = require('../models');

require('dotenv/config');

const HTTP = {
  Created: 201,
  BadRequest: 400,
};

const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(HTTP.BadRequest).json({ message: '"name" is required' });
 
  const newCategory = await Category.create({ name });

  return res.status(HTTP.Created).json(newCategory);
});

module.exports = router; 
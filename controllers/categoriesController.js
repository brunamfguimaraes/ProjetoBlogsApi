const express = require('express');
const { Categories } = require('../models');
require('dotenv/config');

const router = express.Router();

router.get('/', async (_req, res) => {
  const allCategory = await Categories.findAll();
  return res.status(200).json(allCategory);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const createCategory = await Categories.create({ name });
  return res.status(201).json(createCategory);
});

module.exports = router;

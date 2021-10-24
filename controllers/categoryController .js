const express = require('express');
const categoryService = require('../services/categoryService');
const { Category } = require('../models');
const { authValidation } = require('../auth/authMiddleware');

const router = express.Router();

router.post('/', authValidation, async (req, res) => {
  const { name } = req.body;
    try {
    const category = await categoryService.create(name);
    if (category.erro) {
      return res.status(category.erro.code).json({ message: category.erro.message });
    }
    res.status(201).json(category);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get('/', authValidation, async (_req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
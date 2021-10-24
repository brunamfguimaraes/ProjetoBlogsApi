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
    res.status(201).json({ id: category.id, name: category.name });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Attribute: excludes (https://stackoverflow.com/questions/49095292/exclude-primary-key-attributes-from-a-sequelize-query/49098682)
router.get('/', authValidation, async (_req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
const CODE = require('http-status-codes');

const { Category } = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({ name });

    return res.status(CODE.CREATED).JSON(newCategory);
} catch (error) {
console.log(error.message);
res.status(CODE.CONFLICT).json({ message: 'unexpected server problem' });
  }
};

module.exports = { createCategory };
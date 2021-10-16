const CODE = require('http-status-codes');

const { Category } = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    const newCategory = await Category.create({ name });

    return res.status(CODE.CREATED).json(newCategory);
} catch (error) {
console.log(error.message);
res.status(CODE.CONFLICT).json({ message: 'unexpected server problem' });
  }
};

const getAllCategory = async (_req, res) => {
  try {
   const allCategory = await Category.findAll();
   return res.status(CODE.OK).json(allCategory);
  } catch (error) {
    console.log(error.message);
    res.status(CODE.CONFLICT).json({ message: 'unexpected server problem' });
  }
};

module.exports = { 
  createCategory,
  getAllCategory,
};
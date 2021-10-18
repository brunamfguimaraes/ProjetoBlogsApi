const { Category } = require('../models');

const createCategory = async (name) => (!name || name === ''
    ? { message: '"name" is required' }
    : Category.create({ name }));

const getAllCategories = async () => Category.findAll();

module.exports = {
  createCategory,
  getAllCategories,
};
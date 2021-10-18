const { Category } = require('../models');

const createCategory = async (name) => (!name || name === ''
    ? { message: '"name" is required' }
    : Category.create({ name }));

module.exports = {
  createCategory,
};
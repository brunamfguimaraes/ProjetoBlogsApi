const { Category } = require('../models');

const createNewCategory = async (name) => {
  try {
    const created = await Category.create({ name });
    return created;
  } catch (error) {
    throw new Error('"name" is required');
  }
};

module.exports = { createNewCategory };

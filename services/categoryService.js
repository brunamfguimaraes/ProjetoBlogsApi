const { Category } = require('../models');

const registerCategory = async (body) => {
  const { name } = body;
  return Category.create({ name });
};

module.exports = {
  registerCategory,
};
const { Category } = require('../models');

const addCategory = async (name) => {
  console.log(name);
  const createCategory = await Category.create({ name });

  return createCategory;
};

module.exports = {
  addCategory,
};

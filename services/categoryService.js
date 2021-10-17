const { Category } = require('../models');

const isValidName = (name) => {
  if (!name) {
    return '"name" is required';
  }

  return false;
};

const existCategory = async (ids) => {
  console.log(ids);
  const category = await Category.findAll({ where: { id: [...ids] } });
  console.log(category);
  if (category.length !== ids.length) {
    return '"category" not found';
  }

  return false;
};

module.exports = { isValidName, existCategory };
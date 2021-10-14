const { Category } = require('../models');
const verifyName = require('../middlewares/validations');

const createCategory = async (name) => {
  await verifyName.verifyNameCategory(name);
  const category = await Category.create({ name });
  return category;
};

module.exports = { createCategory };
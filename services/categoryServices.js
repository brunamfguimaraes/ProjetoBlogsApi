const { Category } = require('../models');
const verifyName = require('../middlewares/validations');

const createCategory = async (name) => {
  await verifyName.verifyNameCategory(name);
  const category = await Category.create({ name });
  return category;
};

const getCategories = async () => {
  const category = await Category.findAll();
  // const userWithoutPass = users.map((user) => removeUserPass(user));
  return category;
};

module.exports = { createCategory, getCategories };
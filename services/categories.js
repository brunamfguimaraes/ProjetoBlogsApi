const { Category } = require('../models/index');

const serviceCategoryCreate = async (category) => {
  const categoryInserted = await Category.create(category);
  console.log(categoryInserted);
  return { code: 201, categoryInserted };
};

module.exports = {
  serviceCategoryCreate,
};
const { Category } = require('../../../models');

const create = async (data) => {
  const categories = await Category.create({ ...data });

  return categories;
};

const listAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  create,
  listAll,
};
const { Categories } = require('../../../models');

const create = async (data) => {
  const categories = await Categories.create({ ...data });

  return categories;
};

const listAll = async () => {
  const categories = await Categories.findAll();

  return categories;
};

module.exports = {
  create,
  listAll,
};
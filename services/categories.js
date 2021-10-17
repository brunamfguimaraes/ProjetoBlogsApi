const { Categories } = require('../models');

const STATUS = {
  notName: { err: 400, message: '"name" is required' },
};

const postCategoriesServices = async (req) => {
  const { name } = req.body;
  if (!name) { return STATUS.notName; }
  try {
    const categories = await Categories.create({ name });
    return (categories);
  } catch (err) {
    return (err);
  }
};

const getCategoriesServices = async () => {
  try {
    const categories = await Categories.findAll();
    return (categories);
  } catch (err) {
    return (err);
  }
};

module.exports = {
  postCategoriesServices,
  getCategoriesServices,
};
const { Categories } = require('../models');

const STATUS = {
  notName: { err: 400, message: '"name" is required' },
};

const postCategoriesServices = async (req) => {
  const { name } = req.body;
  if (!name) { return STATUS.notName; }
  try {
    const user = await Categories.create({ name });
    return (user);
  } catch (err) {
    return (err);
  }
};

module.exports = {
  postCategoriesServices,
};
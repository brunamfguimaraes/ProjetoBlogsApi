const { StatusCodes: {
  BAD_REQUEST, CREATED } } = require('http-status-codes');
const { createCategory } = require('../services/category');
const { Categories } = require('../models');

const category = async (req, res) => {
  const { name } = req.body;

  const create = await createCategory(name);
  if (create.error) return res.status(BAD_REQUEST).json({ message: create.err.message });

  const findCategory = await Categories.findOne({ where: { name } });
  return res.status(CREATED).json(findCategory);
};

module.exports = {
  category,
};

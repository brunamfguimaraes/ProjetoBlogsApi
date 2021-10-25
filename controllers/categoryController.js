const { Category } = require('../models');

const OK = 200;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

const createCategory = async (req, res) => {
  const { dataValues: { name } } = await Category.create(req.body);

  if (!name) {
    return res.status(INTERNAL_SERVER_ERROR);
  }
  
  return res.status(CREATED).json({ name });
};

const findAllCategories = async (_req, res) => {
  const allCategories = await Category.findAll();
  if (!allCategories) {
    return res.status(INTERNAL_SERVER_ERROR);
  }

  return res.status(OK).json(allCategories);
};

module.exports = { createCategory, findAllCategories };

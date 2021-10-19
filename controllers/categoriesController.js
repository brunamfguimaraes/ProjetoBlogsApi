const { createCategories, getAll } = require('../services/categoriesService');

const post = async (req, res, _next) => {
  const { name } = req.body;
  const user = await createCategories(name);

  return res.status(201).json(user);
};

const get = async (_req, res) => {
  const categories = await getAll();
  return res.status(200).json(categories);
};

module.exports = {
  post,
  get,
};

const { createCategories } = require('../services/categoriesService');

const post = async (req, res, _next) => {
  const { name } = req.body;
  const user = await createCategories(name);

  return res.status(201).json(user);
};

module.exports = {
  post,
};

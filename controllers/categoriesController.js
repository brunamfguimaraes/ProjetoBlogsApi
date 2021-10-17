const categoriesService = require('../services/categoriesService');

const create = async (req, res) => {
  const { name } = req.body;
  const result = await categoriesService.create(name);
  if (result.code) { return res.status(result.code).json({ message: result.message }); }
  res.status(201).json({ id: result, name });
};

module.exports = {
  create,
};
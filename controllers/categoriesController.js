const categoriesServices = require('../services/categoriesService');

const addCategories = async (req, res) => {
  const { name } = req.body;
  const { authorization: token } = req.headers;
  const result = await categoriesServices.addCategories(name, token);
  return res.status(201).json(result);
};

const getCategories = async (req, res) => {
  const { authorization: token } = req.headers;
  const result = await categoriesServices.getCategories(token);
  return res.status(200).json(result);
};

module.exports = {
  getCategories,
  addCategories,
};

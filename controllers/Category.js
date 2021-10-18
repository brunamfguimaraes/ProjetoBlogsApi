const { addCategory, categoriesList } = require('../services/Category');

const requestCreateCategory = async (req, res) => {
  const { name } = req.body;
  const create = await addCategory(name);

  return res.status(201).json(create);
};

const requestCategoriesList = async (req, res) => {
  const categories = await categoriesList();

  return res.status(200).json(categories);
};

module.exports = {
  requestCreateCategory,
  requestCategoriesList,
};

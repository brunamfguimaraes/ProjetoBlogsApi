const categorieService = require('../services/categorieService');

const createCategorie = async (req, res) => {
  const { body } = req;
  const categorieCreated = await categorieService.createCategorie(body);
  return res.status(201).json(categorieCreated);
};

const getAllCategories = async (req, res) => {
  const categoriesList = await categorieService.getAllCategories();
  return res.status(200).json(categoriesList);
};

module.exports = {
  getAllCategories,
  createCategorie,
};

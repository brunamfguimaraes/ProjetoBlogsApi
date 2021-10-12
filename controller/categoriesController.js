const categoriesService = require('../service/categoriesService');

const createCategorie = async (req, res) => {
  const { body } = req;
  const token = req.headers.authorization;

  const categorie = await categoriesService.createCategorie(token, body);

  console.log(categorie);
  
  if (categorie.validToken) {
    return res.status(401).json(categorie.message);
  }

  if (categorie.details) {
    return res.status(400).json({ message: categorie.details[0].message });
  }

  if (categorie.categorieExist) {
    return res.status(409).json(categorie.error);
  }

  return res.status(201).json(categorie);
};

const getAllCategories = async (req, res) => {
  const token = req.headers.authorization;

  const getAll = await categoriesService.getAllCategories(token);

  if (getAll.validToken) {
    return res.status(401).json(getAll.message);
  }

  return res.status(200).json(getAll);
};

module.exports = {
  createCategorie,
  getAllCategories,
};
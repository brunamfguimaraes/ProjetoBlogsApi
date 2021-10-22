const categorieService = require('../services/categorieService');
const { Categorie } = require('../models/index');

const createCategorie = async (req, res, next) => {
  const token = req.headers.authorization;
  const { name } = req.body;
  const validate = categorieService.createCategorie(name, token);
  if (validate.message) {
    return next(validate);
  }
  const { dataValues: { id } } = await Categorie.create({ name });
  return res.status(201).json({ id, name });
};

const getCategories = async (req, res, next) => {
  const token = req.headers.authorization;
  const validate = categorieService.getCategories(token);
  if (validate.message) {
    return next(validate);
  }
  const categories = await Categorie.findAll();
  return res.status(200).json(categories);
};

module.exports = { createCategorie, getCategories };
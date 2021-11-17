const express = require('express');
const Auth = require('../middlewares/auth');
const { createNewCategorie, findAllCategories } = require('../service/categorieService');

const CategorieController = express.Router();

CategorieController.post('/', Auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: '"name" is required' });
    }

    const categorie = await createNewCategorie(name);

    return res.status(201).send(categorie);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

CategorieController.get('/', Auth, async (req, res) => {
  try {
    const categories = await findAllCategories();
  
    return res.status(200).json(categories);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = CategorieController;

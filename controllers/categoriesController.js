const express = require('express');
const { validateCategoryNameWasInformed } = require('../middlewares/categoriesMiddlewares');
const { validateJWT } = require('../middlewares/userMiddlewares');
const { Category } = require('../models');

const categoriesRouter = express.Router();

// ---------------------------------------------------------------
// Requisito 5: CONTROLLER responsável por realizar cadastro de categorias via sequelize e retornar a categoria cadastrada.

categoriesRouter.post('/', validateJWT, validateCategoryNameWasInformed, async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });

    return res.status(201).json(newCategory);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

// ---------------------------------------------------------------
// Requisito 6: CONTROLLER responsável por realizar busca de categorias via sequelize e retornar categorias cadastradas.

categoriesRouter.get('/', validateJWT, async (req, res) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

// ---------------------------------------------------------------

module.exports = { categoriesRouter };
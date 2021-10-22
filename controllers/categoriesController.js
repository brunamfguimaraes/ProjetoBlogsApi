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
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// ---------------------------------------------------------------

module.exports = { categoriesRouter };
const express = require('express');
const rescue = require('express-rescue');
const categoriesController = require('../controllers/categoriesController');

const tokenValidation = require('../middlewares/tokenValidation');
const categoryNameValidation = require('../middlewares/categoryNameValidation');

const categoriesRouter = express.Router();

categoriesRouter.post('/', [tokenValidation, categoryNameValidation],
  rescue(categoriesController.createCategory));

categoriesRouter.get('/', tokenValidation,
rescue(categoriesController.getCategories));

module.exports = categoriesRouter;
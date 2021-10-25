const express = require('express');

const categoriesController = require('../controllers/categoriesController');
const JWTValidation = require('../middlewares/JWTValidation');

const route = express.Router();

route
  .post('/', JWTValidation, categoriesController.createCategory)
  .get('/', JWTValidation, categoriesController.getAllCategories);

module.exports = route;
const express = require('express');

const categoriesController = require('../controllers/categoriesController');
const JWTValidation = require('../middlewares/JWTValidation');
const errorMiddleware = require('../middlewares/error');

const route = express.Router();

route
  .post('/', JWTValidation, categoriesController.createCategory)
  .get('/', JWTValidation, categoriesController.getAllCategories);

route.use(errorMiddleware);

module.exports = route;
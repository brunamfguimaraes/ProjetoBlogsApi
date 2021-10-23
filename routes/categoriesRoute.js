const express = require('express');

const categoriesController = require('../controllers/categoriesController');

const route = express.Router();

route
  .post('/', categoriesController.createCategory)
  .get('/', categoriesController.getAllCategories);

module.exports = route;
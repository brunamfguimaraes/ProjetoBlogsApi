const categoryRoute = require('express').Router();
const rescue = require('express-rescue');
const { validateToken } = require('../middlewares/validateToken');

const CategoryController = require('../controllers/category.controller');

categoryRoute.post(
  '/',
  rescue(validateToken),
  rescue(CategoryController.createCategory),
);

module.exports = categoryRoute;

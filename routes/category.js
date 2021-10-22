const { Router } = require('express');
const Category = require('../controllers/Category');
const { tokenValidation } = require('../mid/tokenValidation');

const CategoryRoute = Router();

CategoryRoute
    .post('/', tokenValidation, Category.newCategory)
    .get('/', tokenValidation, Category.AllCategory);

module.exports = CategoryRoute;

const { Router } = require('express');
const Category = require('../controllers/categorieController');
const { tokenValidation } = require('../mid/tokenValidation');

const catRoute = Router();

catRoute
    .post('/', tokenValidation, Category.newCategory);

module.exports = catRoute;

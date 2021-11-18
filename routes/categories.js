const route = require('express').Router();
const rescue = require('express-rescue');

const tokenValidation = require('../utils/validation/tokenValidation');
const controller = require('../controllers/categoriesController');

route.post('/', rescue(tokenValidation), rescue(controller.createCategorie));

module.exports = route;

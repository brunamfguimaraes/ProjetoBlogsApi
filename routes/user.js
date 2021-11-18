const route = require('express').Router();
const rescue = require('express-rescue');

const controller = require('../controllers/userController');
const tokenValidation = require('../utils/validation/tokenValidation');

route.post('/', rescue(controller.createUser));
route.get('/', rescue(tokenValidation), rescue(controller.getAll));
route.get('/:id', rescue(tokenValidation), rescue(controller.getById));

module.exports = route;

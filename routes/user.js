const route = require('express').Router();
const rescue = require('express-rescue');

const userController = require('../controllers/userController');
const tokenValidation = require('../utils/validation/tokenValidation');

route.post('/', rescue(userController.createUser));
route.get('/', rescue(tokenValidation), rescue(userController.getAll));
route.get('/:id', rescue(tokenValidation), rescue(userController.getById));

module.exports = route;

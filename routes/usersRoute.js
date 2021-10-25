const express = require('express');

const usersController = require('../controllers/usersController');
const JWTValidation = require('../middlewares/JWTValidation');

const route = express.Router();

route
  .post('/', usersController.createUser)
  .get('/', JWTValidation, usersController.getAllUsers)
  .get('/:id', JWTValidation, usersController.getUserById);

module.exports = route;
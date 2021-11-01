const express = require('express');

const usersController = require('../controllers/usersController');
const JWTValidation = require('../middlewares/JWTValidation');
const errorMiddleware = require('../middlewares/error');

const route = express.Router();

route
  .post('/', usersController.createUser)
  .get('/', JWTValidation, usersController.getAllUsers)
  .get('/:id', JWTValidation, usersController.getUserById);

route.use(errorMiddleware);

module.exports = route;
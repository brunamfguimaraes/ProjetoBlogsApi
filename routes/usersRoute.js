const express = require('express');

const usersController = require('../controllers/usersController');

const route = express.Router();

route
  .post('/', usersController.createUser)
  .get('/', usersController.getAllUsers)
  .get('/:id', usersController.getUserById);

module.exports = route;
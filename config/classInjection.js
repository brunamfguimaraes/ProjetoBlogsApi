const { Constants } = require('../constants');
const { User } = require('../models');
const { UserController } = require('../controllers');
const { UserService } = require('../services');

const userService = new UserService(User, Constants.statusCode, Constants.errorMessage);
const userController = new UserController(
  userService,
  Constants.statusCode,
  Constants.errorMessage,
);

module.exports = { userController };
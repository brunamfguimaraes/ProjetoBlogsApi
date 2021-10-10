const { Constants } = require('../constants');
const { User } = require('../models');
const { UserController } = require('../controllers');
const { UserService } = require('../services');
const { UserMiddleware } = require('../middleware');
const { JoiValidation, BaseError } = require('../utils');

const userMiddleware = new 
  UserMiddleware(JoiValidation.userSchema, Constants.statusCode, Constants.errorMessage, BaseError);

const userService = new UserService(User, Constants.statusCode, Constants.errorMessage);
const userController = new 
  UserController(userService, Constants.statusCode, Constants.errorMessage);

module.exports = { userController, userMiddleware };
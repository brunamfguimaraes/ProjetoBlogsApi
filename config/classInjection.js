const jsonWebToken = require('jsonwebtoken');
const { Constants } = require('../constants');
const { User } = require('../models');
const { UserController } = require('../controllers');
const { UserService, AuthService } = require('../services');
const { UserMiddleware } = require('../middleware');
const { JoiValidation, BaseError, Jwt } = require('../utils');

const userMiddleware = new 
  UserMiddleware(JoiValidation.userSchema, Constants.statusCode, Constants.errorMessage, BaseError);

const authService = new AuthService(jsonWebToken, Jwt.config, process.env.JWT_SECRET);

const userService = new 
  UserService(User, authService, Constants.statusCode, Constants.errorMessage);
const userController = new 
  UserController(userService, Constants.statusCode, Constants.errorMessage);

module.exports = { userController, userMiddleware };
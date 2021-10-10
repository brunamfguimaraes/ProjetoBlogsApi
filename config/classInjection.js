const jsonWebToken = require('jsonwebtoken');
const { Constants } = require('../constants');
const { User } = require('../models');
const { UserController, LoginController } = require('../controllers');
const { UserService, AuthService, LoginService } = require('../services');
const { UserMiddleware, LoginMiddleware } = require('../middleware');
const { JoiValidation, BaseError, Jwt } = require('../utils');

const userMiddleware = new UserMiddleware(JoiValidation.userSchema, Constants, BaseError);
const loginMiddleware = new LoginMiddleware(JoiValidation.loginSchema, Constants, BaseError);

const authService = new 
  AuthService({ 
    jwt: jsonWebToken, 
    jwtConfig: Jwt.config, 
    secret: process.env.JWT_SECRET, 
    constants: Constants, 
    errorHandler: BaseError, 
  });

const userService = new UserService(User, authService, Constants);
const loginService = new LoginService(User, authService, Constants);

const userController = new UserController(userService, Constants);
const loginController = new LoginController(loginService, Constants);

module.exports = { 
  userController, 
  loginController, 
  userMiddleware, 
  loginMiddleware,
};
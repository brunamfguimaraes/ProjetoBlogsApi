const jsonWebToken = require('jsonwebtoken');
const { Constants } = require('../constants');
const { User, Category } = require('../models');
const { UserController, LoginController, CategoryController } = require('../controllers');
const { UserService, AuthService, LoginService, CategoryService } = require('../services');
const { UserMiddleware, LoginMiddleware, AuthMiddleware, CategoryMiddleware } = require('../middleware');
const { JoiValidation, BaseError, Jwt } = require('../utils');

const authService = new 
  AuthService({ 
    jwt: jsonWebToken, 
    jwtConfig: Jwt.config, 
    secret: process.env.JWT_SECRET, 
    constants: Constants, 
    errorHandler: BaseError, 
  });

const userMiddleware = new UserMiddleware(JoiValidation.userSchema, Constants, BaseError);
const loginMiddleware = new LoginMiddleware(JoiValidation.loginSchema, Constants, BaseError);
const authMiddleware = new AuthMiddleware(authService, Constants);
const categoryMiddleware = new 
  CategoryMiddleware(JoiValidation.categorySchema, Constants, BaseError);

const userService = new UserService(User, authService, Constants, BaseError);
const loginService = new LoginService(User, authService, Constants);
const categoryService = new CategoryService(Category, authService);

const userController = new UserController(userService, Constants);
const loginController = new LoginController(loginService, Constants);
const categoryController = new CategoryController(categoryService, Constants);

module.exports = { 
  userController, 
  loginController, 
  categoryController,
  userMiddleware, 
  loginMiddleware,
  authMiddleware,
  categoryMiddleware,
};
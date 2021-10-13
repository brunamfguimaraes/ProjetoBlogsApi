const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/userController');

const loginValidation = require('../middlewares/loginValidation');

const loginRouter = express.Router();

loginRouter.post('/', loginValidation, rescue(userController.login));

module.exports = loginRouter;

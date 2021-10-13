const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/userController');

const userValidation = require('../middlewares/userValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const userRouter = express.Router();

userRouter.post('/', userValidation, rescue(userController.createUser));
userRouter.get('/', tokenValidation, rescue(userController.getUsers));

module.exports = userRouter;

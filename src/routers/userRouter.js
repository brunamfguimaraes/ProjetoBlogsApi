const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/userController');

const userValidation = require('../middlewares/userValidation');

const userRouter = express.Router();

userRouter.post('/', userValidation, rescue(userController.createUser));

module.exports = userRouter;

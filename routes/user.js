const express = require('express');
const { userController, userMiddleware } = require('../config');

const userRoute = express.Router();

userRoute.post('/', userMiddleware.validateUser, userController.createUser);

module.exports = userRoute;
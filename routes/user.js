const express = require('express');
const { userController, userMiddleware, authMiddleware } = require('../config');

const userRoute = express.Router();

userRoute.post('/', userMiddleware.validateUser, userController.createUser);

userRoute.get('/', authMiddleware.checkCredentials, userController.listUsers);

module.exports = userRoute;
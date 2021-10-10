const express = require('express');
const { userController, userMiddleware, authMiddleware } = require('../config');

const userRoute = express.Router();

userRoute.post('/', userMiddleware.validateUser, userController.createUser);

userRoute.use(authMiddleware.checkCredentials);

userRoute.get('/', userController.listUsers);
userRoute.get('/:id', userController.getUser);

module.exports = userRoute;
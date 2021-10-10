const express = require('express');
const { userController } = require('../config');

const userRoute = express.Router();

userRoute.post('/', userController.createUser);

module.exports = userRoute;
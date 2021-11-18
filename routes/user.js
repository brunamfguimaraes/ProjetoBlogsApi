const express = require('express');
const userController = require('../controllers/user');
const userService = require('../services/user');

const router = express.Router();

router.post(
  '/user',
  userService.validatesDisplayName,
  userService.validateEmail,
  userService.validateEmailFormat,
  userService.validatePassword,
  userService.validatePasswordLength,
  userService.emailAlreadyExists,
  userController.createUser,
);

router.get(
  '/user',
  userService.validateToken,
  userController.getUsers,
);

module.exports = router; 
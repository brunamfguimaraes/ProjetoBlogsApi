const express = require('express');
const userController = require('../controllers/userController');
const userService = require('../services/userService');

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

router.get(
  '/user/:id',
  userService.validateToken,
  userController.getUsersById,
);

router.delete(
  '/post/:id',
  userService.validateToken,
  userController.deletePost,
);

router.delete(
  '/user/me',
  userService.validateToken,
  userController.deleteUser,
);

module.exports = router; 
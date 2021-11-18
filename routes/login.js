const express = require('express');
const loginController = require('../controllers/loginController');
const loginService = require('../services/loginService');

const router = express.Router();

router.post(
  '/login',
  loginService.emailIsNotNull,
  loginService.validateEmail,
  loginService.passwordIsNotNull,
  loginService.validatePassword,
  loginController.login,
);

module.exports = router; 
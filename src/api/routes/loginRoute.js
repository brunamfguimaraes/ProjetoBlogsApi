const express = require('express');
const { create } = require('../../controllers/loginController');

const generateToken = require('../../middlewares/generateToken');

const { 
  validateEmail,
  validatePassword,
} = require('../../middlewares/loginMiddlewares');

const router = express.Router();

router.post('/',
  validateEmail,
  validatePassword,
  generateToken,
  create);

module.exports = router;
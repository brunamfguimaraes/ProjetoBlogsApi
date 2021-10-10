const express = require('express');
const { create } = require('../../controllers/userController');

const generateToken = require('../../middlewares/generateToken');

const { 
  validateDisplayName,
  validateEmail,
  validatePassword, 
} = require('../../middlewares/userMiddlewares');

const router = express.Router();

router.post('/',
  validateDisplayName,
  validateEmail,
  validatePassword, 
  generateToken,
  create);

module.exports = router;
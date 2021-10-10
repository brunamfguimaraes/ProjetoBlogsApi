const express = require('express');
const { create, 
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('../../controllers/userController');

const generateToken = require('../../middlewares/generateToken');

const router = express.Router();

router.post('/', 
  validateDisplayName,
  validateEmail,
  validatePassword,
  generateToken,
  create);

module.exports = router;
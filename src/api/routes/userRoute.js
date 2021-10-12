const express = require('express');
const { create, getAllUsers } = require('../../controllers/userController');

const generateToken = require('../../middlewares/generateToken');
const validateToken = require('../../middlewares/validateToken');

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

router.get('/', 
  validateToken,
  getAllUsers);

module.exports = router;
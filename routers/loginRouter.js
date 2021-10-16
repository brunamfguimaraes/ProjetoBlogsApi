const express = require('express');
const { loginUser } = require('../controllers/loginController');

const router = express.Router();

const { 
  validatePassword,
  validateEmail, 
 } = require('../middlewares/userValidations');

 router.post('/', validateEmail, validatePassword, loginUser);

 module.exports = router;
const express = require('express');
const { login } = require('../controllers/loginController');
const { validLogin, validEmail } = require('../middlewares/loginValidations');

const router = express.Router();

router.route('/')
  .post(validLogin, validEmail, login);

module.exports = router;
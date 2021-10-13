const express = require('express');
const { login } = require('../controllers/loginController');
const { validLogin, findEmail } = require('../middlewares/loginValidations');

const router = express.Router();

router.route('/')
  .post(validLogin, findEmail, login);

module.exports = router;
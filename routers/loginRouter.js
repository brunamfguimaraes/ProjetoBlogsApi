const express = require('express');
const { login } = require('../controllers/loginController');
const { validLogin, validUserDB } = require('../middlewares/loginValidations');

const router = express.Router();

router.route('/')
  .post(validLogin, validUserDB, login);

module.exports = router;
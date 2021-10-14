const express = require('express');

const router = express.Router();
const controller = require('../controllers/userController');
const {
  validateEmail,
  validatePassword,
  validateEmptyFields,
} = require('../middlewares/genericValidations');

router.post('/', validateEmptyFields, validateEmail, validatePassword, controller.logInUser);

module.exports = router;

const express = require('express');

const loginController = require('../controllers/loginController');
const { validLogin, validEmail } = require('../middlewares/loginValidations');

const router = express.Router();

router.route('/')
.post(validLogin, validEmail, loginController.login);

module.exports = router;
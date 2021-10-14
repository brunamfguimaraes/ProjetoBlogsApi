const express = require('express');

const loginController = require('../controllers/loginController');
// const { validUser, uniqueEmail } = require('../middlewares/loginValidations');

const router = express.Router();

router.route('/')
.post(loginController.login);

module.exports = router;
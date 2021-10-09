const express = require('express');
const { login } = require('../controllers/loginController');
const { validateLogin } = require('../middlewares/validateUser');

const router = express.Router();

// router.route('/').post(validateCredentials, validateUserInDB, login);
router.route('/').post(validateLogin, login);

module.exports = router;
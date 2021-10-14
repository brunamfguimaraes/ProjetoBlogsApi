const express = require('express');

const router = express.Router();
const controller = require('../controllers/userController');
const { validateName, validateEmail, validatePassword } = require('../middlewares/validations');

router.post('/', validateName, validateEmail, validatePassword, controller.registerUser);

module.exports = router;

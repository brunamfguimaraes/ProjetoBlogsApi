const express = require('express');

const router = express.Router();
const controller = require('../controllers/userController');
const {
  validateName,
  validateEmail,
  validatePassword,
} = require('../middlewares/genericValidations');
const { checkToken, validateJWT } = require('../middlewares/jwtValidations');

router.post('/', validateName, validateEmail, validatePassword, controller.registerUser);
router.get('/', checkToken, validateJWT, controller.getUser);

module.exports = router;

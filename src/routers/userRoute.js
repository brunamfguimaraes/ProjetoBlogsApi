const express = require('express');

const router = express.Router();
const controller = require('../controllers/userController');
const {
  validatedisplayName,
  validateEmail,
  validatePassword,
} = require('../middlewares/genericValidations');
const { checkToken, validateJWT } = require('../middlewares/jwtValidations');

router.post('/', validatedisplayName, validateEmail, validatePassword, controller.registerUser);
router.get('/', checkToken, validateJWT, controller.getUser);
router.get('/:id', checkToken, validateJWT, controller.getUserById);

module.exports = router;

const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');
const { validateJWT } = require('../auth/validateToken');
const { validUser, uniqueEmail } = require('../middlewares/userValidations');

const router = express.Router();

router.route('/')
  .post(validUser, uniqueEmail, createUser)
  .get(validateJWT, getAllUsers);

module.exports = router;
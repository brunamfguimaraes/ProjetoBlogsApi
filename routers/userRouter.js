const express = require('express');
const { createUser, getAllUsers, getUserById } = require('../controllers/userController');
const { validateJWT } = require('../auth/validateToken');
const { validUser, uniqueEmail, idExists } = require('../middlewares/userValidations');

const router = express.Router();

router.route('/')
  .post(validUser, uniqueEmail, createUser)
  .get(validateJWT, getAllUsers);

router.route('/:id')
.get(validateJWT, idExists, getUserById);

module.exports = router;
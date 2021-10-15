const express = require('express');
const { validateFilds, validationEmail, validateUser } = require('../middlewares/validationsUser');
const { validateJWT } = require('../middlewares/validationToken');
const { createUser, getAllUser, getUserById } = require('../controller/User');

const router = express.Router();

router.route('/')
  .post(validateFilds, validationEmail, createUser)
  .get(validateJWT, getAllUser);

router.route('/:id')
  .get(validateJWT, validateUser, getUserById);
  module.exports = router;
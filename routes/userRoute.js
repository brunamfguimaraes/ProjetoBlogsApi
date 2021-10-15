const express = require('express');
const { validateFilds, validationEmail } = require('../middlewares/validationsUser');
const { validateJWT } = require('../middlewares/validationToken');
const { createUser, getUser } = require('../controller/User');

const router = express.Router();

router.route('/')
  .post(validateFilds, validationEmail, createUser)
  .get(validateJWT, getUser);

  module.exports = router;
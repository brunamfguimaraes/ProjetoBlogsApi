const express = require('express');
const { validateFilds, validationEmail } = require('../middlewares/validations');
// const validateToken = require('../middlewares/validationToken');
const { createUser } = require('../controller/User');

const router = express.Router();

router.route('/')
  .post(validateFilds, validationEmail, createUser);

  module.exports = router;
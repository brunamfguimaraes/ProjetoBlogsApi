const express = require('express');
const { validateFilds, validationEmail } = require('../middlewares/validationsUser');
const { generateToken } = require('../Token/creatToke');
const { createUser } = require('../controller/User');

const router = express.Router();

router.route('/')
  .post(validateFilds, validationEmail, createUser)
  .get(generateToken);

  module.exports = router;
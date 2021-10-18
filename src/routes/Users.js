const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { createUser, getAllUsers } = require('../controllers/Users');

const router = express.Router();

router.route('/')
  .post(createUser)
  .get(validateJWT, getAllUsers);

module.exports = router;
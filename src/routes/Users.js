const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { createUser, getAllUsers, getUserById } = require('../controllers/Users');

const router = express.Router();

router.route('/')
  .post(createUser)
  .get(validateJWT, getAllUsers);

router.route('/:id')
  .get(validateJWT, getUserById);

module.exports = router;
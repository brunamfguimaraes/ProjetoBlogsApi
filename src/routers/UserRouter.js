const express = require('express');
const { createUser, getUsers, getUser } = require('../controllers/UserController');
const JWTValidator = require('../validators/JWTValidator');

const router = express.Router();

router.route('/')
  .post(createUser)
  .get(JWTValidator, getUsers);

router.route('/:id')
  .get(JWTValidator, getUser);

module.exports = router;

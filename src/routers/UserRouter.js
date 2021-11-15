const express = require('express');
const { createUser, getUsers, getUser, deleteUser } = require('../controllers/UserController');
const JWTValidator = require('../validators/JWTValidator');

const router = express.Router();

router.route('/')
  .post(createUser)
  .get(JWTValidator, getUsers);

router.route('/:id')
  .get(JWTValidator, getUser);

router.route('/me')
  .delete(JWTValidator, deleteUser);

module.exports = router;

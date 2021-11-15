const express = require('express');
const { createUser, getUsers, userLogin } = require('../controllers/UserController');

const router = express.Router();

router.route('/')
  .post(createUser)
  .get(getUsers)
  .post(userLogin);

module.exports = router;

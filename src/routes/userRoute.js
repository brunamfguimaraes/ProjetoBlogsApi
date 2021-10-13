const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');
const valiteJWT = require('../auth/validateJWT');

const router = express.Router();

router.route('/')
  .post(createUser)
  .get(
    valiteJWT,
    getAllUsers,
  );

module.exports = router;
const express = require('express');
const { createUser, getAllUsers, getById } = require('../controllers/userController');
const valiteJWT = require('../auth/validateJWT');

const router = express.Router();

router.route('/')
  .post(createUser)
  .get(
    valiteJWT,
    getAllUsers,
  );

router.route('/:id')
  .get(
    valiteJWT,
    getById,
  );

module.exports = router;
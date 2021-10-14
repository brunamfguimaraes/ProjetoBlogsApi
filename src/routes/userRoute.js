const express = require('express');
const { createUser, getAllUsers, getById, removeUser } = require('../controllers/userController');
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

router.route('/me')
  .delete(
    valiteJWT,
    removeUser,
  );

module.exports = router;
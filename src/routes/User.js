const express = require('express');

const router = express.Router();

const validateToken = require('../middleweres/validateToken');

const {
createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/Users');

router.route('/')
.get(validateToken, getAllUsers)
.post(createUser);

router.route('/:id')
.get(validateToken, getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;

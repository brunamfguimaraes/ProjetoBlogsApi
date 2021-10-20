const express = require('express');

const validCreateUser = require('../middleware/validCreateUser');

const validateJWT = require('../auth/validateJWT');
const { 
  createUser,
  getAllUsers,
  findUser, 
} = require('../controllers/usersController');

const router = express.Router();

router.get('/:id', validateJWT, findUser);

router.get('/', validateJWT, getAllUsers);

router.post('/', validCreateUser, createUser);

// router.delete();

module.exports = router;
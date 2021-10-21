const express = require('express');

const { createUser, getAllUsers } = require('../controllers/usersController');
const validCreateUser = require('../middleware/validCreateUser');

const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.get('/', validateJWT, getAllUsers);

// router.put();

// router.delete();

router.post('/', validCreateUser, createUser);

// router.delete();

module.exports = router;
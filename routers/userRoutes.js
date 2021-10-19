const express = require('express');

const { createUser, getAllUsers } = require('../controllers/usersController');
const validCreateUser = require('../middleware/validCreateUser');
const validateJWT = require('../middleware/validateJWT');

const router = express.Router();

router.get('/', validateJWT, getAllUsers);

// router.put();

// router.delete();

router.post('/', validCreateUser, createUser);

module.exports = router;
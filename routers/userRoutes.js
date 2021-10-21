const express = require('express');

const { createUser, getAllUsers /* findUser */ } = require('../controllers/usersController');
const validCreateUser = require('../middleware/validCreateUser');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.get('/:id', validateJWT);

router.get('/', validateJWT, getAllUsers);

// router.put();

// router.delete();

router.post('/', validCreateUser, createUser);

module.exports = router;
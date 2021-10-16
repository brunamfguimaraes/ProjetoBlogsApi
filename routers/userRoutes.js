const express = require('express');

const { createUser } = require('../controllers/usersController');
const validCreateUser = require('../middleware/validCreateUser');

// const validateJWT = require('../middleware/validateJWT');

const router = express.Router();

// router.post();

// router.put();

// router.delete();

router.post('/', validCreateUser, createUser);

module.exports = router;
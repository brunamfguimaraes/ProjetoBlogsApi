const express = require('express');

const { User, Login, getUsers, findUser } = require('../controller/user');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/user', User);
router.get('/user', validateJWT, getUsers);
router.get('/user/:id', validateJWT, findUser);
router.post('/login', Login);

module.exports = { router };
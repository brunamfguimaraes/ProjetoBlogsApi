const express = require('express');

const { User, Login, getUsers, findUser } = require('../controller/user');
const validateJWT = require('../auth/validateJWT');

const route = express.Router();

route.get('/user/:id', validateJWT, findUser);
route.post('/user', User);
route.get('/user', validateJWT, getUsers);
route.post('/login', Login);

module.exports = route;

const express = require('express');

const { user, login, getUsers, findUser } = require('../controller/user');
const validateJWT = require('../auth/validateJWT');

const route = express.Router();

route.get('/user/:id', validateJWT, findUser);
route.post('/user', user);
route.get('/user', validateJWT, getUsers);
route.post('/login', login);

module.exports = route;

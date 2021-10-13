const express = require('express');

const User = require('../controllers/User');
const Login = require('../controllers/Login');
const Categories = require('../controllers/Categories');

const routes = express.Router();

routes.use(express.json());

routes.use('/user', User);
routes.use('/login', Login);
routes.use('/categories', Categories);

module.exports = routes;
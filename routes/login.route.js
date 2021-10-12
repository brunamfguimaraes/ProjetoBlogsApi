const loginRoute = require('express').Router();
const rescue = require('express-rescue');

const LoginController = require('../controllers/login.controller');

loginRoute.post('/', rescue(LoginController.login));

module.exports = loginRoute;

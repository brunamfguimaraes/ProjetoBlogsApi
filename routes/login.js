const route = require('express').Router();
const rescue = require('express-rescue');

const loginController = require('../controllers/loginController');

route.post('/', rescue(loginController.login));

module.exports = route;

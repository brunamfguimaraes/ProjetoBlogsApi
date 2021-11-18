const route = require('express').Router();
const rescue = require('express-rescue');

const controller = require('../controllers/loginController');

route.post('/', rescue(controller.login));

module.exports = route;

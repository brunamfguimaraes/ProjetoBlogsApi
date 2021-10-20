const route = require('express').Router();
const rescue = require('express-rescue');

const controller = require('../controllers/controllerUser');

route.post('/', rescue(controller.create));

module.exports = route;

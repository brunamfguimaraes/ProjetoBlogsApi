const route = require('express').Router();
const rescue = require('express-rescue');

const userController = require('../controllers/userController');

route.post('/', rescue(userController.createUser));

module.exports = route;

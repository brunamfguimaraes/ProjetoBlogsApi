const usersRoute = require('express').Router();
const rescue = require('express-rescue');
const { validateToken } = require('../middlewares/validateToken');

const UserController = require('../controllers/users.controller');

usersRoute.post('/', rescue(UserController.createUser));
usersRoute.get('/', rescue(validateToken), rescue(UserController.getAllUsers));

module.exports = usersRoute;

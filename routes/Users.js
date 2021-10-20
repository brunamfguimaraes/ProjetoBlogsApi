const { Router } = require('express');
const userController = require('../controllers/userController');

const Users = Router();

Users.post('/', userController.newUser);

module.exports = Users;

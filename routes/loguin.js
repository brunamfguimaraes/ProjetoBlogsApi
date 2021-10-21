const { Router } = require('express');
const userController = require('../controllers/User');

const login = Router();

login
.post('/', userController.userLogin);  

module.exports = login;

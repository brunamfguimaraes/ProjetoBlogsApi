const express = require('express');

const { validations } = require('./middlewares');
const { userController } = require('./controllers');

const router = express.Router();

router.post('/user', validations.createUser, userController.createUser);
router.post('/login', validations.login, userController.login);

module.exports = router;
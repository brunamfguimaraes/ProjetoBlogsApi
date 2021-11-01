const express = require('express');

const loginController = require('../controllers/loginController');
const errorMiddleware = require('../middlewares/error');

const route = express.Router();

route.post('/', loginController.login);

route.use(errorMiddleware);

module.exports = route;
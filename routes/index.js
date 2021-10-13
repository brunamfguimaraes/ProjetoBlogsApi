const express = require('express');
const User = require('../controllers/User');

const routes = express.Router();

routes.use(express.json());

routes.use('/user', User);

module.exports = routes;
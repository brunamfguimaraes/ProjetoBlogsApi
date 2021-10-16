const express = require('express');
const { createUsers } = require('../controllers/user');

const rota = express.Router();

rota.post('/user', createUsers);

module.exports = rota;
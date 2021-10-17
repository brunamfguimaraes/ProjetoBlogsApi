const express = require('express');
const { createUsers, loginUsers } = require('../controllers/user');

const rota = express.Router();

rota.post('/user', createUsers);
rota.post('/login', loginUsers);

module.exports = rota;
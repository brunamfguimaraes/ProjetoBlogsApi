const express = require('express');
const { createUsers, loginUsers, allUsers } = require('../controllers/user');
const { verifyToken } = require('../services/token');

const rota = express.Router();

rota.post('/user', createUsers);
rota.post('/login', loginUsers);
rota.get('/user', verifyToken, allUsers);

module.exports = rota;
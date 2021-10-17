const express = require('express');
const { postCategories, getCategories } = require('../controllers/catecories');
const { createUsers, loginUsers, allUsers, getIdUsers } = require('../controllers/user');
const { verifyToken } = require('../services/token');

const rota = express.Router();

rota.post('/user', createUsers);
rota.post('/login', loginUsers);
rota.get('/user/:id', verifyToken, getIdUsers);
rota.get('/user', verifyToken, allUsers);
rota.post('/categories', verifyToken, postCategories);
rota.get('/categories', verifyToken, getCategories);

module.exports = rota;
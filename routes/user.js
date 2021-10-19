const express = require('express');
const { createUser, getUsers, getUser } = require('../controllers/User');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();
router.post('/', createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUser);

module.exports = router;
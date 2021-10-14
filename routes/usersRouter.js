const express = require('express');
const usersController = require('../controller/usersController');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();
router.get('/:id', validateToken, usersController.getById);
router.get('/', validateToken, usersController.getAll);
router.post('/', usersController.createUser);

module.exports = router;
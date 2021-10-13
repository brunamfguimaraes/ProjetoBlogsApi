const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/user', UserController.createUser);
router.post('/login', UserController.login);

module.exports = router;
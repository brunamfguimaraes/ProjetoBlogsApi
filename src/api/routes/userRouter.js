const express = require('express');

const router = express.Router();
const { validateUser, verifyToken } = require('../middlewares/validateUser');

const { createUser, getAllUsers } = require('../controllers/userController');

router.route('/').get(verifyToken, getAllUsers).post(validateUser, createUser);

module.exports = router;

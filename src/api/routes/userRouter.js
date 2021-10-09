const express = require('express');

const router = express.Router();
const { validateUser, verifyToken } = require('../middlewares/validateUser');

const { createUser, getAllUsers, getUser } = require('../controllers/userController');

router.route('/').get(verifyToken, getAllUsers).post(validateUser, createUser);
router.route('/:id').get(verifyToken, getUser);

module.exports = router;

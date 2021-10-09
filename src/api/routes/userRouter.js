const express = require('express');

const router = express.Router();
const { validateUser } = require('../middlewares/validateUser');

const { createUser } = require('../controllers/userController');

router.route('/').post(validateUser, createUser);

module.exports = router;

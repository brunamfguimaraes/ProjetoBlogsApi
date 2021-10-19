const express = require('express');
const { createUser, getUsers } = require('../controllers/User');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();
router.post('/', createUser);
router.get('/',checkToken, getUsers);

module.exports = router;
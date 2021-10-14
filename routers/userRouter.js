const express = require('express'); 
const { createUser, getAllUsers } = require('../controller/userController');
const { verifyJWT } = require('../auth/JWToken');

const router = express.Router();
router.route('/') 
.post(createUser)
.get(verifyJWT, getAllUsers);

module.exports = router;
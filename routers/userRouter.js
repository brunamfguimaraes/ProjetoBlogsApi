const express = require('express'); 
const { createUser, getAllUsers, getById } = require('../controller/userController');
const { verifyJWT } = require('../auth/JWToken');

const router = express.Router();
router.route('/') 
.post(createUser)
.get(verifyJWT, getAllUsers);

router.route('/:id')
.get(verifyJWT, getById);

module.exports = router;
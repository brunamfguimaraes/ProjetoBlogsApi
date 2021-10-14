const express = require('express');
const statusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const router = express.Router();

const secret = 'seusecretdetoken';

router.post('/user', async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const createUser = await userService.createUser({ displayName, email, password, image });
    
    if (createUser.message === 'User already registered') {
        return res.status(statusCode.CONFLICT).json({ message: createUser.message });
    } 

    if (createUser.message) {
        return res.status(statusCode.BAD_REQUEST).json({ message: createUser.message });
    }
        
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    const token = jwt.sign({ data: createUser }, secret, jwtConfig);
    return res.status(statusCode.CREATED).json({ token });
});

module.exports = router;

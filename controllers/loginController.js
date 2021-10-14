const express = require('express');
const statusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
/* const { User } = require('../models'); */
const loginService = require('../services/loginService');

const router = express.Router();

const secret = 'seusecretdetoken';

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const login = await loginService.loginUser({ email, password });

    if (login.message) {
        return res.status(statusCode.BAD_REQUEST).json({ message: login.message });
    }

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    const token = jwt.sign({ data: login }, secret, jwtConfig);
    return res.status(statusCode.OK).json({ token });
});

module.exports = router;
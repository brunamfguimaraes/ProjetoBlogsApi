const express = require('express');
const statusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

const secret = 'seusecretdetoken';

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const login = await User.findOne({ where: { email, password } });
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    const token = jwt.sign({ data: login }, secret, jwtConfig);
    return res.status(statusCode.CREATED).json({ token });
});

module.exports = router;
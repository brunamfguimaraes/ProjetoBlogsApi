const express = require('express');
const statusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

const secret = 'seusecretdetoken';

router.post('/', async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const jwtConfig = {
            expiresIn: '7d',
            algorithm: 'HS256',
        };
        const createUser = await User.create({ displayName, email, password, image });
        const token = jwt.sign({ data: createUser }, secret, jwtConfig);
        return res.status(statusCode.CREATED).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ops! algo deu errado' });
    }
});

module.exports = router;
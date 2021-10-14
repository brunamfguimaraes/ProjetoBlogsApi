const express = require('express');
const statusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const router = express.Router();

const secret = 'seusecretdetoken';

router.post('/', async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const createUser = await userService.createUser({ displayName, email, password, image });
    
    if (createUser.message) {
        return res.status(400).json({ message: createUser.message });
    }

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    const token = jwt.sign({ data: createUser }, secret, jwtConfig);
    return res.status(statusCode.CREATED).json({ token });
});

module.exports = router;

/* try {
    const { displayName, email, password, image } = req.body;
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    const createUser = await userService({ displayName, email, password, image });
    const token = jwt.sign({ data: createUser }, secret, jwtConfig);
    return res.status(statusCode.CREATED).json({ token });
} catch (error) {
    console.log(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
    .json({ message: 'Ops! algo deu errado' });
} */
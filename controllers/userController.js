const express = require('express');
const statusCode = require('http-status-codes');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const createUser = await User.create({ displayName, email, password, image });
        console.log(createUser, 'estou no create');
        return res.status(statusCode.CREATED).json(createUser);
    } catch (error) {
        console.log(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ops! algo deu errado' });
    }
});

module.exports = router;
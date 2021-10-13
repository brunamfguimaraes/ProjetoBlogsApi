const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv');

const createUser = async (req, res) => {
    await User.create(req.body);

    const { id, displayName, email, image } = User;

    const Token = jwt.sign({
        id, displayName, email, image,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: 1440, // 24h
    });
    return res.status(201).json({ token: Token });
};

module.exports = {
    createUser,
};
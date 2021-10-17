const jwt = require('jsonwebtoken');
// const { User } = require('../models');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfiguration = {
    expiresIn: '1d',
    algorithm: 'HS256',
};

const createToken = async (user) => {
    const tokenSign = jwt.sign({ data: user }, secret, jwtConfiguration);
    return tokenSign;
};

module.exports = { createToken };
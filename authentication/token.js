const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfiguration = {
    expiresIn: '1d',
    algorithm: 'HS256',
};

const createToken = (user) => {
    console.log('token');
    const tokenSign = jwt.sign({ data: user }, secret, jwtConfiguration);
    return tokenSign;
};

module.exports = { createToken };
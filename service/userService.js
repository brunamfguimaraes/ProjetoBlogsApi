// const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { createToken } = require('../authentication/token');

// require('dotenv').config();

// const secret = process.env.JWT_SECRET;

// const jwtConfiguration = {
//     expiresIn: '1d',
//     algorithm: 'HS256',
// };

// const createToken = (user) => {
//     console.log('token');
//     const tokenSign = jwt.sign({ data: user }, secret, jwtConfiguration);
//     return tokenSign;
// };

const createUser = async (req, res) => {
    console.log('createUuser', req.body);
    const user = await User.create(req.body);
    const token = createToken(user);
    return res.status(201).json(token);
};

const checkEmailExists = async (email, res) => {
    const check = await User.findOne({ where: { email } });
    if (check !== null) {
    return res.status(409).json({
        message: 'User already registered',
        });
    }
    return false;
};

module.exports = { createUser, checkEmailExists };
const jwt = require('jsonwebtoken');
// const { User } = require('../models');

require('dotenv').config();

const { JWT_SECRET } = process.env;

const tokenNotFound = {
    message: 'Token not found',
};

const tokenExpired = {
    message: 'Expired or invalid token',
};

const createToken = (payload) => {
    // const { STATUS } = req.user;
    // console.log(req.user);
    // const { email } = req.body;

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    console.log('Email aqui', payload);
    
    const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
    console.log('token criado', token);
    
    // return res.status(STATUS).json(token);
    return token;
};

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log('token', token);
        if (!token) {
            return res.status(401).json(tokenNotFound);
        }
        const result = jwt.verify(token, JWT_SECRET);
        console.log('result aqui', result);

        // const user = await User.findOne({ where: { email: result } });
        // console.log('retornei o user', user);

        // if (!user) {
        //     return tokenExpired;
        // }

        next();
        // return user;
    } catch (err) {
        console.log('Entrei no catch', err.message);
        return res.status(401).json(tokenExpired);
    }
};

module.exports = {
    createToken,
    verifyToken,
};

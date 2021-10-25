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
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    
    const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
    
    return token;
};

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json(tokenNotFound);
        }
        const result = jwt.verify(token, JWT_SECRET);

        req.user = result;

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(401).json(tokenExpired);
    }
};

module.exports = {
    createToken,
    verifyToken,
};

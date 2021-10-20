const jwt = require('jsonwebtoken');
// const { User } = require('../models');

require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const tokenNotFound = {
    message: 'Token not found',
};

const tokenExpired = {
    messege: 'Expired or invalid token',
};

const validateToken = (req, res) => {
    const { email, STATUS } = req.user;
    // console.log(req.user);

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    
    const token = jwt.sign({ data: email }, SECRET, jwtConfig);
    
    return res.status(STATUS).json(token);
};

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json(tokenNotFound);
        }

        const { data } = jwt.verify(token, SECRET);
        console.log(data);

        // const user = User.findOne({ where: { email: data } });

        // if (!user) {
        //     return res.status(401).json(tokenExpired);
        // }

        next();
    } catch (err) {
        // console.log(err.message);
        return res.status(401).json(tokenExpired);
    }
};

module.exports = {
    validateToken,
    verifyToken,
};

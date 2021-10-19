const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_TRUE = process.env.JWT_SECRET;

const HTTP_REST = require('../HTTPErrosAndMessages');

const { message, statusCode } = HTTP_REST;

const WrongToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(statusCode.TOKEN_INVALID)
            .json({ message: message.TOKEN_NOT_EXISTS }); 
}
    try {
    jwt.verify(token, JWT_SECRET_TRUE);
    next();
    } catch (error) {
        return res.status(statusCode.TOKEN_INVALID).json({ message: message.INVALID_TOKEN });
    }
    }; 

module.exports = {
    WrongToken,
};
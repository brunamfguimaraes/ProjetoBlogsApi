const jwt = require('jsonwebtoken');
require('dotenv').config();

const HTTP_REST = require('../HTTPErrosAndMessages');

const { message, statusCode } = HTTP_REST;

const WrongToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
     return res.status(statusCode.TOKEN_INVALID).json({ message: message.TOKEN_NOT_EXISTS });
    }
    try {
     jwt.verify(token, process.env.JWT_SECRET);
     next(); 
    } catch (error) {
     return res.status(statusCode.TOKEN_INVALID).json({ message: message.INVALID_TOKEN });
    }
};

const WrongName = (req, res, next) => {
    const { name } = req.body;
    console.log(req.body);
    if (!name) {
        return res.status(statusCode.WRONG_FORMAT).json({ message: message.NAME_NOT_EXISTS }); 
}
    next();
};

module.exports = {
    WrongToken,
    WrongName,
};
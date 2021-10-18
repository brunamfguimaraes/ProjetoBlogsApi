const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_TRUE = process.env.JWT_SECRET;

const HTTP_REST = require('../HTTPErrosAndMessages');

const { message, statusCode } = HTTP_REST;

const WrongTitle = (req, res, next) => {
    const { title } = req.body;
    // console.log(req.body);
    if (!title) {
        return res.status(statusCode.WRONG_FORMAT).json({ message: message.TITLE_NOT_EXIST }); 
}
    next();
};

const WrongContent = (req, res, next) => {
    const { content } = req.body;
    // console.log(req.body);
    if (!content) {
        return res.status(statusCode.WRONG_FORMAT).json({ message: message.CONTENT_NOT_EXISTS }); 
}
    next();
};

const WrongCategoryID = (req, res, next) => {
    const { categoryIds } = req.body;
    // console.log(req.body);
    if (!categoryIds) {
        return res.status(statusCode.WRONG_FORMAT)
        .json({ message: message.CATEGORYID_NOT_EXISTS }); 
}
    next();
};

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
    WrongTitle,
    WrongContent,
    WrongCategoryID,
};
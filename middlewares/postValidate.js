require('dotenv').config();

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

module.exports = {
    WrongTitle,
    WrongContent,
    WrongCategoryID,
};
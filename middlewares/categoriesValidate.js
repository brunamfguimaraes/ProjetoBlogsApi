require('dotenv').config();

const HTTP_REST = require('../HTTPErrosAndMessages');

const { message, statusCode } = HTTP_REST;

const WrongName = (req, res, next) => {
    const { name } = req.body;
    // console.log(req.body);
    if (!name) {
        return res.status(statusCode.WRONG_FORMAT).json({ message: message.NAME_NOT_EXISTS }); 
}
    next();
};

module.exports = {

    WrongName,
};
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_TRUE = process.env.JWT_SECRET;

const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const HTTP_REST = require('../HTTPErrosAndMessages');

const { message, statusCode } = HTTP_REST;

// O campo displayName deverá ser uma string com no mínimo de 8 caracteres;
// O campo email será considerado válido se tiver o formato <prefixo>@<domínio> e se for único. Ele é obrigatório.
// A senha deverá conter 6 caracteres. Ela é obrigatória.

const WrongdisplayName = (req, res, next) => {
    const { displayName } = req.body;
    // console.log(message, statusCode);
    if (!displayName || displayName.length < 8) {
        return res.status(statusCode.WRONG_FORMAT)
        .json({ message: message.DISPLAY_NAME_TOO_SHORT });
    }

    next();
  };

const WrongEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(statusCode.WRONG_FORMAT)
        .json({ message: message.EMAIL_NOT_EXISTS });
    }
    if (!validEmail.test(email)) {
        return res.status(statusCode.WRONG_FORMAT)
        .json({ message: message.INVALID_EMAIL });
    }
    next();
};

const WrongPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(statusCode.WRONG_FORMAT)
        .json({ message: message.PASSWORD_NOT_EXISTS });
    }
    if (password.length < 6) {
        return res.status(statusCode.WRONG_FORMAT)
        .json({ message: message.PASSWORD_TOO_SHORT });
    }
    next();
};

// const WrongToken = async (req, res, next) => {
//     const token = req.headers.authorization;
//     console.log(JWT_SECRET_TRUE, 'estou no meu middleware');
    
//     if (!token) {
//      return res.status(statusCode.TOKEN_INVALID).json({ message: message.TOKEN_NOT_EXISTS });
//     }
//     try {
//     req.user = jwt.verify(token, JWT_SECRET_TRUE);
//     next(); 
//     } catch (error) {
//         // console.log(error, 'estou no middleware dentro do catch');
//      return res.status(statusCode.TOKEN_INVALID).json({ message: message.INVALID_TOKEN });
//     }
// };

const WrongToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    try {
    const answer = jwt.verify(token, JWT_SECRET_TRUE);
    req.user = answer.data;
    next();
    } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
    }
    }; 

module.exports = {
    WrongdisplayName,
    WrongEmail,
    WrongPassword,
    WrongToken,
};
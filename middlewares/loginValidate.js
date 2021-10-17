const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const HTTP_REST = require('../HTTPErrosAndMessages');

const { message, statusCode } = HTTP_REST;

// O campo displayName deverá ser uma string com no mínimo de 8 caracteres;
// O campo email será considerado válido se tiver o formato <prefixo>@<domínio> e se for único. Ele é obrigatório.
// A senha deverá conter 6 caracteres. Ela é obrigatória.

const LoginEmailIsWrong = (req, res, next) => {
    const { email } = req.body;
    if (email === '') {
        return res.status(statusCode.WRONG_FORMAT)
        .json({ message: message.EMAIL_EMPTY });
    }
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

  const LoginPasswordIsWrong = (req, res, next) => {
    const { password } = req.body;
    if (password === '') {
        return res.status(statusCode.WRONG_FORMAT)
        .json({ message: message.PASSWORD_EMPTY });
    }
    if (!password) {
        return res.status(statusCode.WRONG_FORMAT)
        .json({ message: message.PASSWORD_NOT_EXISTS });
    }
    next();
  };

module.exports = {
    LoginEmailIsWrong,
    LoginPasswordIsWrong,
};
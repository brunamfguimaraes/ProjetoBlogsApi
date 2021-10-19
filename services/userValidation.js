const { User } = require('../models');

const BAD_REQUEST = 400;
const CONFLICT = 409;

// req 1
// Verifica se nome de usuário tem pelo menos 8 caracteres
const userNameValidation = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(BAD_REQUEST).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

// req 1
// verifica se email é no formato correto e se já existe algum email registrado
const emailRequireValidation = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(BAD_REQUEST).json({ message: '"email" is required' });
  next();
};

// req 1
// Verifica se o formato de email é válido
const emailFormatValidation = async (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /[a-zA-Z]+@[a-zA-Z]+/;
  if (!regexEmail.test(email)) {
    return res.status(BAD_REQUEST).json({ message: '"email" must be a valid email' });
  } 
  next();
};

// req 1
// Verifica se já existe usuário registrado
const existEmailValidation = async (req, res, next) => {
  const { email } = req.body;
  const existsEmail = await User.findOne({ where: { email } });
  if (existsEmail) return res.status(CONFLICT).json({ message: 'User already registered' });
  next();
};

// req 1
// verifica se senha foi preechida e se contém pelo menos 6 caracteres
const passwordLengthValidation = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(BAD_REQUEST).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

// req 1
// Verifica se o campo senha foi preenchido
const passwordRequireValidation = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(BAD_REQUEST).json({ message: '"password" is required' });
  next();
};

module.exports = {
  userNameValidation,
  emailRequireValidation,
  emailFormatValidation,
  existEmailValidation,
  passwordLengthValidation,
  passwordRequireValidation,
};

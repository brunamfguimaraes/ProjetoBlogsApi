const jwt = require('jsonwebtoken');
const regexEmail = require('../helpers/regexEmail');
const { User } = require('../models');
require('dotenv').config();

// Comments: Lista de erros
const errors = {
  displayNameLength: '"displayName" length must be at least 8 characters long',
  passwordLength: '"password" length must be 6 characters long',
  emailFormat: '"email" must be a valid email',
  emailRequired: '"email" is required',
  emailEmpty: '"email" is not allowed to be empty',
  userRegistered: 'User already registered',
  passwordRequired: '"password" is required',
  passwordEmpty: '"password" is not allowed to be empty',
  userNotRegistered: 'Invalid fields',
  missingAuthToken: 'Token not found',
  expiredOrInvalidToken: 'Expired or invalid token',
};

// Comments: Valida se o campo displayName é uma string com no mínimo de 8 caracteres.
const validateDisplayNameLength = async (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(400).json({ message: errors.displayNameLength });
  }

  next();
};

// Comments: Valida se o campo email tem o formato <prefixo>@<domínio>.
const validateEmailFormat = async (req, res, next) => {
  const { email } = req.body;

  if (!regexEmail(email)) {
    return res.status(400).json({ message: errors.emailFormat });
  }

  next();
};

// Comments: Valida se o campo email foi informado na requisição.
const validateEmailWasInformed = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: errors.emailRequired });
  }

  next();
};

// Comments: Valida se o campo email está vazio na requisição.
const validateEmailIsEmpty = async (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(400).json({ message: errors.emailEmpty });
  }

  next();
};

// Comments: Valida se o campo email é único (Se já existe na base de dados).
const validateEmailIsAlreadyRegistered = async (req, res, next) => {
    const { email } = req.body;

    const userEmail = await User.findOne({ where: { email } });

    if (userEmail) {
      return res.status(409).json({ message: errors.userRegistered });
    }

    next();
};

// Comments: Valida se o usuário já existe na base de dados.
const validateUserIsRegistered = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: errors.userNotRegistered });
  }

  next();
};

// Comments: Valida se não é possível cadastrar usuário com o campo password diferente de 6 caracteres.
const validatePasswordLength = async (req, res, next) => {
  const { password } = req.body;

  if (password.length !== 6) {
    return res.status(400).json({ message: errors.passwordLength });
  }

  next();
};

// Comments: Valida se o campo password foi informado na requisição.
const validatePasswordWasInformed = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: errors.passwordRequired }); 
}

  next();
};

// Comments: Valida se o campo password foi informado na requisição.
const validatePasswordIsEmpty = async (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(400).json({ message: errors.passwordEmpty }); 
}

  next();
};

// Source: https://app.betrybe.com/course/back-end/autenticacao-e-upload-de-arquivos/nodejs-jwt-json-web-token/acf1c24f-d531-4cf0-be9b-2384e37799d7/conteudos/096ab7ca-bfa4-41d2-9b14-fe5a42aa956c/implementando-jwt/e8ebbc5b-1a0d-4baa-97df-d355be493891?use_case=side_bar
const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token === '') return res.status(401).json({ message: errors.missingAuthToken });
  
  try {
    /* Através do método verify, podemos validar e decodificar o nosso JWT. */
    jwt.verify(token, process.env.JWT_SECRET);

    /* Caso o token esteja expirado, a própria biblioteca irá retornar um erro,
    por isso não é necessário fazer validação do tempo. */

    next();
  } catch (err) {
    return res.status(401).json({ message: errors.expiredOrInvalidToken });
  }
};

module.exports = {
  validateDisplayNameLength,
  validateEmailFormat,
  validateEmailWasInformed,
  validateEmailIsEmpty,
  validateEmailIsAlreadyRegistered,
  validatePasswordLength,
  validatePasswordWasInformed,
  validatePasswordIsEmpty,
  validateUserIsRegistered,
  validateJWT,
};
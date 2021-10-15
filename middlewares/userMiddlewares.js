const regexEmail = require('../helpers/regexEmail');
const { User } = require('../models');

// Comments: Lista de erros
const errors = {
  displayNameLength: '"displayName" length must be at least 8 characters long',
  passwordLength: '"password" length must be 6 characters long',
  emailFormat: '"email" must be a valid email',
  emailRequired: '"email" is required',
  userRegistered: 'User already registered',
  passwordRequired: '"password" is required',
};

// Comments: Valida se o campo displayName é uma string com no mínimo de 8 caracteres.
const validateDisplayNameLength = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
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

  if (!email || email === '') {
    return res.status(400).json({ message: errors.emailRequired });
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

  if (!password || password === '') {
    return res.status(400).json({ message: errors.passwordRequired }); 
}

  next();
};

module.exports = {
  validateDisplayNameLength,
  validateEmailFormat,
  validateEmailWasInformed,
  validateEmailIsAlreadyRegistered,
  validatePasswordLength,
  validatePasswordWasInformed,
};
const { code, errorMessage } = require('../schema/index');

const validatedisplayName = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('displayName') });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { body } = req;
  const bodyKeys = Object.keys(body);
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i;
  
  if (!bodyKeys.includes('email')) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('noEmail') });
  }
  
  if (!regexEmail.test(body.email)) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('email') });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('noPassword') });
  }
  
  if (password.toString().length !== 6) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('password') });
  }

  next();
};

const validateEmptyFields = (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('emailEmpty') });
  }

  if (password === '') {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('passwordEmpty') });
  }

  next();
};

const validateName = (req, res, next) => {
  const bodyKey = Object.keys(req.body);

  if (!bodyKey.includes('name')) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('noName') });
  }

  next();
};

module.exports = {
  validatedisplayName,
  validateEmail,
  validatePassword,
  validateEmptyFields,
  validateName,
};

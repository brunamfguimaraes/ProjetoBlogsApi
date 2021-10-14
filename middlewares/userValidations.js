const Joi = require('joi');

const validateName = (name) => {
  const validation = Joi.string().min(8).required().validate(name);
  console.log(validation);
  if (validation.error) { 
    return ({ message: '"displayName" length must be at least 8 characters long' });
  }
  return false;
};

const validateEmail = (email) => {
  if (email === '') return ({ message: '"email" is not allowed to be empty' });
  if (email === undefined) return ({ message: '"email" is required' });
  const validation = Joi.string().email().required().validate(email);
  if (validation.error) { 
    return ({ message: '"email" must be a valid email' });
  }
  return false;
};

const validatePassword = (password) => {
  console.log(password);
  if (password === '') return ({ message: '"password" is not allowed to be empty' });
  if (password === undefined) return ({ message: '"password" is required' });
  const validation = Joi.string().min(6).required().validate(password);
  if (validation.error) { 
    return ({ message: '"password" length must be 6 characters long' });
  }
  return false;
};

const validateCreateUser = (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const invalidName = validateName(displayName);
  const invalidEmail = validateEmail(email);
  const invalidPassword = validatePassword(password);
  if (invalidName) next(invalidName);
  if (invalidEmail) next(invalidEmail);
  if (invalidPassword) next(invalidPassword);
  next();
};

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  const invalidEmail = validateEmail(email);
  const invalidPassword = validatePassword(password);
  if (invalidEmail) next(invalidEmail);
  if (invalidPassword) next(invalidPassword);
  next();
};

module.exports = {
  validateCreateUser,
  validateLogin,
};
const Joi = require('joi');

const validateName = (name) => {
  const validation = Joi.string().min(8).required().validate(name);
  if (validation.error) { 
    return ({ message: '"displayName" length must be at least 8 characters long' });
  }
  return false;
};

const validateEmail = (email) => {
  if (!email) return ({ message: '"email" is required' });
  const validation = Joi.string().email().required().validate(email);
  if (validation.error) { 
    return ({ message: '"email" must be a valid email' });
  }
  return false;
};

const validatePassword = (password) => {
  const validation = Joi.string().min(6).required().validate(password);
  if (validation.error) { 
    return ({ message: '"password" length must be 6 characters long' });
  }
  return false;
};

const validations = (req, _res, next) => {
  const { displayName, email, password } = req;
  const invalidName = validateName(displayName);
  const invalidEmail = validateEmail(email);
  const invalidPassword = validatePassword(password);
  if (invalidName) next(invalidName);
  if (invalidEmail) next(invalidEmail);
  if (invalidPassword) next(invalidPassword);
  next();
};

module.exports = validations;
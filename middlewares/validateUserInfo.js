const Joi = require('joi');

const nameLengthErr = { 
  err: {
    status: 400,
    message: '"displayName" length must be at least 8 characters long',
} };

const emailExistsErr = { 
  err: {
    status: 400,
    message: '"email" is required',
} };

const emailValidErr = { 
  err: {
    status: 400,
    message: '"email" must be a valid email',
} };

const passLengthErr = { 
  err: {
    status: 400,
    message: '"password" length must be 6 characters long',
} };

function validateName(name) {
  const validation = Joi.string().min(8).required().validate(name);
  if (validation.error) return nameLengthErr;
  return false;
}

function validateEmail(email) {
  if (!email) return emailExistsErr;
  const validation = Joi.email().required().validate(email);
  if (validation.error) return emailValidErr; 
  return false;
}

function validatePassword(password) {
  const validation = Joi.string().min(6).required().validate(password);
  if (validation.error) return passLengthErr;
  return false;
}

function validateUser(req, res, next) {
  const { displayName, email, password } = req.body;
  const nameIsNotValid = validateName(displayName);
  const emailIsNotValid = validateEmail(email);
  const passIsNotValid = validatePassword(password);

  if (nameIsNotValid) return nameIsNotValid;
  if (emailIsNotValid) return emailIsNotValid;
  if (passIsNotValid) return passIsNotValid;

  next();
}

module.exports = validateUser;
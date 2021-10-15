const Joi = require('joi');

const nameLengthErr = { 
  err: {
    status: 400,
    message: {
      message: '"displayName" length must be at least 8 characters long',
    },
} };

const emailExistsErr = { 
  err: {
    status: 400,
    message: {
      message: '"email" is required',
    },
} };

const emailValidErr = { 
  err: {
    status: 400,
    message: {
      message: '"email" must be a valid email', 
    },
} };

const passExistsErr = { 
  err: {
    status: 400,
    message: {
      message: '"password" is required',
    },
} };

const passLengthErr = { 
  err: {
    status: 400,
    message: {
      message: '"password" length must be 6 characters long',
    },
} };

function validateName(name) {
  const validation = Joi.string().min(8).required().validate(name);
  if (validation.error) return nameLengthErr;
  return false;
}

function validateEmail(email) {
  if (!email) return emailExistsErr;
  const validation = Joi.string().email().required().validate(email);
  if (validation.error) return emailValidErr; 
  return false;
}

function validatePassword(password) {
  if (!password) return passExistsErr;
  const validation = Joi.string().min(6).required().validate(password);
  if (validation.error) return passLengthErr;
  return false;
}

function validateUser(req, res, next) {
  const { displayName, email, password } = req.body;
  const nameIsNotValid = validateName(displayName);
  const mailIsNotValid = validateEmail(email);
  const passIsNotValid = validatePassword(password);

  if (nameIsNotValid) return res.status(nameIsNotValid.err.status).json(nameIsNotValid.err.message);
  if (mailIsNotValid) return res.status(mailIsNotValid.err.status).json(mailIsNotValid.err.message);
  if (passIsNotValid) return res.status(passIsNotValid.err.status).json(passIsNotValid.err.message);

  next();
}

module.exports = validateUser;
const Joi = require('joi');

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
      message: '"email" is not allowed to be empty', 
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
      message: '"password" is not allowed to be empty',
    },
} };

function validateEmail(email) {
  if (email === '') return emailValidErr;
  if (!email) return emailExistsErr;
  const validation = Joi.string().email().required().validate(email);
  if (validation.error) return emailValidErr; 
  return false;
}

function validatePassword(password) {
  if (password === '') return passLengthErr;
  if (!password) return passExistsErr;
  const validation = Joi.string().min(6).required().validate(password);
  if (validation.error) return passLengthErr;
  return false;
}

function validateUser(req, res, next) {
  const { email, password } = req.body;
  const mailIsNotValid = validateEmail(email);
  const passIsNotValid = validatePassword(password);

  if (mailIsNotValid) return res.status(mailIsNotValid.err.status).json(mailIsNotValid.err.message);
  if (passIsNotValid) return res.status(passIsNotValid.err.status).json(passIsNotValid.err.message);

  next();
}

module.exports = validateUser;
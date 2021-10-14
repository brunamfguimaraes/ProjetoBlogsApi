const { User } = require('../models');
const codes = require('./codes');
const Indexerror = require('./Indexerror');
const errorMessages = require('./errorMessages');

const validateName = (displayName, min) => {
  if (displayName.length < min) {
    throw new Indexerror(codes.badRequest, errorMessages.displayLengthError);
  }
};

const verifyEmail = (email) => {
  const re = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
  return re.test(email);
 };

 const emailAlreadyExists = async (email) => {
  const user = await User.findOne({ where: { email } });
    return user;
  };

 const emailValidate = (email) => {
  if (email === '') throw new Indexerror(codes.badRequest, errorMessages.emailIsNotEmpty);
  if (!email) throw new Indexerror(codes.badRequest, errorMessages.emailIsRequired);
  if (!verifyEmail(email)) {
    throw new Indexerror(codes.badRequest, errorMessages.invalidEmail);
}
};

const passwordValidate = (password, min) => {
  if (password === '') throw new Indexerror(codes.badRequest, errorMessages.passwordIsNotEmpty);
  if (!password) throw new Indexerror(codes.badRequest, errorMessages.isrequired);
  if (password.length < min) {
    throw new Indexerror(codes.badRequest, errorMessages.invalidPassword);
}
};

const verifyCreateUser = async (displayName, email, password) => {
  validateName(displayName, 8);
  passwordValidate(password, 6);
  emailValidate(email);
  if (await emailAlreadyExists(email)) {
    throw new Indexerror(codes.conflict, errorMessages.alreadyExists);
  }
};

/* const verifyCreateLogin = async (email, password) => {
  if (!email) throw new Indexerror(codes.badRequest, errorMessages.emailIsRequired);
  if (!password) throw new Indexerror(codes.badRequest, errorMessages.isrequired);
  if (email === '') throw new Indexerror(codes.badRequest, errorMessages.emailIsNotEmpty);
  if (password === '') throw new Indexerror(codes.badRequest, errorMessages.passwordIsNotEmpty);
};
 */
module.exports = { verifyCreateUser };

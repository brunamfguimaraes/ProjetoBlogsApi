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

const verifyCreateLogin = async (email, password) => {
  emailValidate(email);
  passwordValidate(password);

  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    throw new Indexerror(codes.badRequest, errorMessages.invalidFields);
  }
};

const verifyNameCategory = (name) => {
  if (!name) {
    throw new Indexerror(codes.badRequest, errorMessages.nameIsRequired);
  }
};

const verifyFieldsBlogpost = (title, content, categoryIds) => {
  if (!title) {
    throw new Indexerror(codes.badRequest, errorMessages.titleIsRequired);
  }
  if (!content) {
    throw new Indexerror(codes.badRequest, errorMessages.contentIsRequired);
  }
  if (!categoryIds) {
    throw new Indexerror(codes.badRequest, errorMessages.categoryIdIsRequired);
  }
};

module.exports = { verifyCreateUser, verifyCreateLogin, verifyNameCategory, verifyFieldsBlogpost };

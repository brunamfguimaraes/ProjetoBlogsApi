const { User } = require('../models');

const err = { message: 'displayName length must be at least 8 characters long',
};

const invalidEmail = { message: 'email must be a valid email' };

const invalidPassword = { message: 'password length must be 6 characters long' };

const emailIsRequired = { message: 'email is required' };

const emailIsNotEmpty = { message: '"email" is not allowed to be empty' };

const passwordIsNotEmpty = { message: '"password" is not allowed to be empty' };

const isrequired = { message: 'password is required' };

const alreadyExists = { message: 'User already registered' };

const validateName = (displayName, min) => {
  if (displayName.length < min) {
    return (err.message);
  }
};

const verifyEmail = (email) => {
  const re = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
  return re.test(email);
 };

 const emailValidate = (email) => {
  if (email === '') return emailIsNotEmpty;
  if (!email) return emailIsRequired;
  if (!verifyEmail(email)) {
    return invalidEmail;
}
};

const passwordValidate = (password, min) => {
  if (password === '') return passwordIsNotEmpty;
  if (!password) return isrequired;
  if (password.length < min) {
    return invalidPassword;
}
};

const emailAlreadyExists = async (email) => {
  const user = await User.findOne({ where: { email } });
    return user;
  };

const verifyCreateUser = async (displayName, email, password) => {
  validateName(displayName, 8);
  passwordValidate(password, 6);
  emailValidate(email);
  if (await emailAlreadyExists(email)) return alreadyExists;
};

module.exports = { validateName, emailValidate, verifyCreateUser };

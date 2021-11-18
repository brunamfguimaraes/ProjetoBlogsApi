const { User } = require('../../models');
const erroMessage = require('../errosCode/erroMessage');

const err = (statusCode) => (statusCode);

const displayNameUser = (displayName) => {
  if (!displayName || displayName.length < 8) {
    throw err({ statusCode: erroMessage.DISPLAY_LEAST_CHARACTER });
  }
};

const emailExist = (email) => {
  if (!email) throw err({ statusCode: erroMessage.EMAIL_NOT_EXIST });
};

const emailNotEmpty = (email) => {
  if (email.length === 0) throw err({ statusCode: erroMessage });
};

const emailIsValid = (email) => {
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!validEmail) throw err({ statuCode: erroMessage.EMAIL_NOT_VALID });
};

const passwordExist = (password) => {
  if (!password) throw err({ statusCode: erroMessage.PASSWORD_NOT_EXIST });
};

const passwordNotEmpty = (password) => {
  if (password.length === 0) throw err({ statusCode: erroMessage });
};

const passwordIsValid = (password) => {
  if (password.length !== 6) throw err({ statusCode: erroMessage.PASSWORD_DIFFERENT_LENGTH });
};

const userExist = async (email) => {
  const response = await User.findOne({ where: { email } });
  if (response) throw err({ statusCode: erroMessage.USER_EXIST });
};

const loginInvalid = async (email, password) => {
  const response = await User.findOne({ where: { email, password } });
  if (!response) throw err({ statusCode: erroMessage.LOGIN_INVALID });
};

// const image = (imageUser) => {

// };

module.exports = {
  displayNameUser,
  userExist,
  emailExist,
  emailNotEmpty,
  emailIsValid,
  passwordExist,
  passwordNotEmpty,
  passwordIsValid,
  loginInvalid,
  // image,
};

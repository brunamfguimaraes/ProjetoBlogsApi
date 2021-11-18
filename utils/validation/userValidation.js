const { User } = require('../../models');
const erroMessage = require('../errosCode/erroMessage');

const err = (statusCode) => (statusCode);

const displayNameUser = (displayName) => {
  if (!displayName || displayName.length < 8) {
    throw err({ statusCode: erroMessage.DISPLAY_LEAST_CHARACTER });
  }
};

const emailUser = (email) => {
  if (!email) throw err({ statusCode: erroMessage.EMAIL_NOT_EXIST });
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!validEmail) throw err({ statuCode: erroMessage.EMAIL_NOT_VALID });
};

const passwordUser = (password) => {
  if (!password) throw err({ statusCode: erroMessage.PASSWORD_NOT_EXIST });
  if (password.length !== 6) throw err({ statusCode: erroMessage.PASSWORD_DIFFERENT_LENGTH });
};

const userExist = async (email) => {
  const response = await User.findOne({ where: { email } });
  if (response) throw err({ statusCode: erroMessage.USER_EXIST });
};

// const image = (imageUser) => {

// };

module.exports = {
  displayNameUser,
  emailUser,
  passwordUser,
  userExist,
  // image,
};

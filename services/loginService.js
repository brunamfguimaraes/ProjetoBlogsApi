const { User } = require('../models');

const fieldIvalid = { message: 'Invalid fields' };

const existPasswordEmail = (email, password) => {
  let resp = false;
  if (email === undefined) {
    resp = { message: '"email" is required' };
  }

  if (password === undefined) {
    resp = { message: '"password" is required' };
  }

  return resp;
};

const blankPasswordEmail = (email, password) => {
  let resp = false;
  if (email.length === 0) {
    resp = { message: '"email" is not allowed to be empty' };
  }

  if (password.length === 0) {
    resp = { message: '"password" is not allowed to be empty' };
  }

  return resp;
};

const login = async (email, password) => {
  const existField = existPasswordEmail(email, password);

  if (existField.message) {
    return existField;
  }

  // console.log(email.length)

  const blankField = blankPasswordEmail(email, password);

  if (blankField.message) {
    return blankField;
  }

  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    return fieldIvalid;
  }

  return user;
};

module.exports = {
  login,
};

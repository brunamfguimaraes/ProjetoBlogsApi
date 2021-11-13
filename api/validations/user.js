const User = require('../../models/User');

const BAD_REQUEST = 'bad_request';
const CONFLICT = 'conflict';

const displayNameIsValid = (displayName) => {
  if (displayName.length < 8) {
    return {
      codeErr: BAD_REQUEST,
      errMsg: '"displayName" length must be at least 8 characters long',
    };
  }

  return true;
};

const emailIsValid = async (email) => {
  if (!email) {
    return { codeErr: BAD_REQUEST, errMsg: '"email" is required' };
  }

  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!validEmail.test(email)) {
    return { codeErr: BAD_REQUEST, errMsg: '"email" must be a valid email' };
  }

  const repeatedEmail = await User.findOne({ where: { email } });

  if (repeatedEmail) {
    return { codeErr: CONFLICT, errMsg: 'User already registered' };
  }

  return true;
};

const passwordIsValid = (password) => {
  if (!password) {
    return { codeErr: BAD_REQUEST, errMsg: '"password" is required' };
  }

  if (password.length !== 6) {
    return {
      codeErr: BAD_REQUEST,
      errMsg: '"password" length must be 6 characters long',
    };
  }

  return true;
};

module.exports = {
  displayNameIsValid,
  emailIsValid,
  passwordIsValid,
};

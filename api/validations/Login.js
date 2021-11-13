const { User } = require('../../models/index');

const BAD_REQUEST = 'bad_request';

const emailIsValid = async (email) => {
  if (email === '') {
    return { codeErr: BAD_REQUEST, errMsg: '"email" is not allowed to be empty' };
  }

  if (!email) {
    return { codeErr: BAD_REQUEST, errMsg: '"email" is required' };
  }

  const userExists = await User.findOne({ where: { email } });

  if (!userExists) {
    return { codeErr: BAD_REQUEST, errMsg: 'Invalid fields' };
  }

  return true;
};

const passwordIsValid = (password) => {
  if (password === '') {
    return { codeErr: BAD_REQUEST, errMsg: '"password" is not allowed to be empty' };
  }

  if (!password) {
    return { codeErr: BAD_REQUEST, errMsg: '"password" is required' };
  }

  return true;
};

module.exports = {
  emailIsValid,
  passwordIsValid,
};

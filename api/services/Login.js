const { User } = require('../../models/index');

const { emailIsValid, passwordIsValid } = require('../validations/login');
const { generateToken } = require('../tools/generateToken');

const BAD_REQUEST = 'bad_request';

const validatingBodyData = async (email, password) => {
  const validEmail = await emailIsValid(email);
  if (validEmail.errMsg) {
    return { codeErr: validEmail.codeErr, errMsg: validEmail.errMsg };
  }

  const validPassword = passwordIsValid(password);
  if (validPassword.errMsg) {
    return { codeErr: validPassword.codeErr, errMsg: validPassword.errMsg };
  }

  return true;
};

const login = async (email, password) => {
  const bodyDataIsValid = await validatingBodyData(email, password);
  if (bodyDataIsValid.errMsg) {
    return { codeErr: bodyDataIsValid.codeErr, errMsg: bodyDataIsValid.errMsg };
  }

  const user = await User.findOne({ where: { email } });
  if (user.password !== password) {
    return { codeErr: BAD_REQUEST, errMsg: 'incorrect password' };
  }

  const token = generateToken({ email });
  return { token };
};

module.exports = {
  login,
};

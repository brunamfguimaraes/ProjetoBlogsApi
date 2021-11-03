const { User } = require('../../models/index');

const { displayNameIsValid, emailIsValid, passwordIsValid } = require('../validations/user');
const { generateToken } = require('../tools/generateToken');

const validatingBodyData = async (displayName, email, password) => {
  const validDisplayName = displayNameIsValid(displayName);
  if (validDisplayName.errMsg) {
    return { codeErr: validDisplayName.codeErr, errMsg: validDisplayName.errMsg };
  }

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

const registerNewUser = async (displayName, email, password, image) => {
  const bodyDataIsValid = await validatingBodyData(displayName, email, password);
  if (bodyDataIsValid.errMsg) {
    return {
      codeErr: bodyDataIsValid.codeErr,
      errMsg: bodyDataIsValid.errMsg,
    };
  }

  await User.create({ displayName, email, password, image });

  const token = generateToken({ email });
  return { token };
};

module.exports = {
  registerNewUser,
};

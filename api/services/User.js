const { User } = require('../../models/index');

const { displayNameIsValid, emailIsValid, passwordIsValid } = require('../validations/user');
const { generateToken } = require('../tools/generateToken');

const NOT_FOUND = 'not_found';

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

  try {
    await User.create({ displayName, email, password, image });
  } catch (error) {
    return { errMsg: error.message };
  }

  const token = generateToken({ email });
  return { token };
};

const getAllUsers = async () => {
  try {
    const allUsers = await User.findAll();

    return allUsers;
  } catch (error) {
    return { errMsg: error.message };
  }
};

const getUserById = async (id) => {
  let user = null;

  try {
    user = await User.findByPk(id);
  } catch (error) {
    return { errMsg: error.message };
  }

  if (!user) return { codeErr: NOT_FOUND, errMsg: 'User does not exist' };

  return user;
};

const deleteMe = async ({ id }) => {
  try {
    await User.destroy({ where: { id } });

    return true;
  } catch (error) {
    return { errMsg: error.message };
  }
};

module.exports = {
  registerNewUser,
  getAllUsers,
  getUserById,
  deleteMe,
};

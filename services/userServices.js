const { User } = require('../models');

const userValidations = require('../validations/userValidations');

const addUser = async (user) => {
  userValidations.validDisplayName(user.displayName);
  userValidations.validEmail(user.email);
  userValidations.validPassword(user.password);
  await userValidations.validEmailExists(user.email);
  const result = await User.create(user);
  return result.dataValues;
};

const getUsers = async (token) => {
  userValidations.validToken(token);
  const users = await User.findAll();
  const result = users.map((user) => {
    const { dataValues } = user;
    delete dataValues.password;
    return dataValues;
  });
  return result;
};

const getUserByid = async (id, token) => {
  userValidations.validToken(token);
  const user = await User.findOne({ where: { id } });
  userValidations.validUser(user);
  delete user.dataValues.password;
  return { result: user.dataValues };
};

module.exports = {
  addUser,
  getUsers,
  getUserByid,
};
const Joi = require('joi');
const { Users } = require('../models');

const validateNewUserInfo = (userInfo) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).not().empty()
.required(),
    email: Joi.string().email().not().empty()
.required(),
    password: Joi.string().length(6).not().empty()
.required(),
    image: Joi.allow(),
  }).validate(userInfo);

  return error;
};

const validateLoginInfo = (loginInfo) => {
  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
.required(),
    password: Joi.string().not().empty().required(),
  }).validate(loginInfo);

  return error;
};

const userAlreadyRegistered = (email) =>
  Users.findOne({
    where: { email },
    attributes: [],
  });

const verifyLogin = (loginInfo) =>
  Users.findOne({
    where: loginInfo,
    attributes: ['id', 'displayName', 'email', 'image'],
  });

const createUser = async (userInfo) => {
  const invalidInfo = validateNewUserInfo(userInfo);

  if (invalidInfo) return { error: invalidInfo };

  const userRegistered = await userAlreadyRegistered(userInfo.email);

  if (userRegistered) {
    return {
      error: { userRegistered: true, message: 'User already registered' },
    };
  }

  const newUser = await Users.create(userInfo);

  return newUser;
};

const loginUser = async (loginInfo) => {
  const invalidInfo = validateLoginInfo(loginInfo);

  if (invalidInfo) return { error: invalidInfo };

  const loginVerified = await verifyLogin(loginInfo);

  if (!loginVerified) {
    return { error: { invalidFields: true, message: 'Invalid fields' } };
  }

  return loginVerified.dataValues;
};

const findUsers = async () =>
  Users.findAll();
// const exemple =  () => {};

module.exports = {
  verifyLogin,
  createUser,
  loginUser,
  findUsers,
};

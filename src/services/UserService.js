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

const userAlreadyRegistered = (email) =>
  Users.findOne({
    where: { email },
    attributes: ['id', 'displayName', 'email', 'password', 'image'],
  });

const createUser = async (userInfo) => {
  const invalid = validateNewUserInfo(userInfo);

  if (invalid) return { error: invalid };

  const userRegistered = await userAlreadyRegistered(userInfo.email);

  if (userRegistered) {
    return {
      error: { userRegistered: true, message: 'User already registered' },
    };
  }

  const newUser = await Users.create(userInfo);

  return newUser;
};
module.exports = {
  createUser,
};

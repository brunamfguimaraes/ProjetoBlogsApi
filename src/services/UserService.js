const { user } = require('../models');
const helper = require('../helper');
const validator = require('../validators/UserValidator');

const getUsers = () => user.findAll({
  attributes: {
    exclude: ['password', 'createdAt', 'updatedAt'],
  },
});

const createUser = async ({ displayName, email, password, image }) => {
  await validator.emailValidator(email, user);
  await user.create({ displayName, email, password, image });
  const jwt = helper.generateJWT({ displayName, email });

  return jwt;
};

const userLogin = async ({ email, password }) => {
  const valid = await user.findOne({ where: { email, password } });
  validator.fieldsValidator(valid);

  const { _password, ...payload } = valid;
  const jwt = helper.generateJWT(payload);

  return jwt;
};

module.exports = {
  getUsers,
  createUser,
  userLogin,
};

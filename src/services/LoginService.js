const { User } = require('../../models');
const { loginValidator } = require('../validators/LoginValidator');

const userLogin = async (email, password) => {
  const fields = loginValidator({ email, password });

  if (fields.message) {
    return fields;
  }

  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return { message: 'Invalid fields' };
  }

  return user;
};

module.exports = {
  userLogin,
};

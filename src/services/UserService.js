const { User } = require('../sequelize/models');

const newUser = async (data) => {
  const { email } = data;
  const verifyRegisteredEmail = await User.findOne({ where: { email } });

  if (verifyRegisteredEmail === null) {
    const user = await User.create(data);
    return user;
  }

  return {
    error: {
      message: 'User already registered',
    },
  };
};

const getAll = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  // https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll
  return allUsers;
};

module.exports = { newUser, getAll };

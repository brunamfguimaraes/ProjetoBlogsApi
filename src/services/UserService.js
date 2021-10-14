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

const findVyId = () => {};

module.exports = { newUser, findVyId };

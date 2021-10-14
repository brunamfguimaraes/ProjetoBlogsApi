const { User } = require('../sequelize/models');

const login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email, password } });

  if (user === null) {
    return {
      error: {
        message: 'Invalid fields',
      },
    };
  }

  return user;
};

module.exports = login;

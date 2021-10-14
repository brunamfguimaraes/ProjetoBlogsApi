const { User } = require('../sequelize/models');

const newUser = async (data) => {
  const { email } = data;
  const verifyRegisteredEmail = await User.findOne({ where: { email } });
  // console.log('verificação email', verifyRegisteredEmail);
  // console.log('model', User);

  if (verifyRegisteredEmail === null) {
    const user = User.create(data);
    // console.log('dentro do if');
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

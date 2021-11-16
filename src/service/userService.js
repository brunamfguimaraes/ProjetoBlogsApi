const Sequelize = require('sequelize');
const { User } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validName = (name) => name.lenght >= 8;

const validEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !re.test(email)) return false;
};

const emailAlreadyInUse = async (email) => {
  const user = await User.findOne({ where: { email } });

  console.log(user);
};

const validPassword = (password) => password.lenght >= 6;

const createNewUser = async (displayName, email, password, image) => {
  const result = await sequelize.transaction(async (t) => {
    const user = await User.create({ displayName, email, password, image }, { transaction: t });

    return user;
  });
};

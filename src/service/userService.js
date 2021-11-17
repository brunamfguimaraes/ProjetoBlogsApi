const Sequelize = require('sequelize');
const { User } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validName = (name) => {
  if (name.length < 8) {
    return {
      message: '"displayName" length must be at least 8 characters long',
    };
  }
};

const validEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return { message: '"email" is required' };
  if (!re.test(email)) return { message: '"email" must be a valid email' };
};

const emailAlreadyInUse = async (email) => {
  if (!email) return { message: '"email" is required' };
  const user = await User.findOne({ where: { email } });

  if (user) return { message: 'User already registered', errorStatus: 409 };
};

const validPassword = (password) => {
  if (!password) return { message: '"password" is required' };
  if (password.toString().length !== 6) {
    return { 
      message: '"password" length must be 6 characters long', 
    }; 
  }
};

const isUserFieldsInvalid = async (displayName, email, password) => {
  const dataCheck = await Promise.all([
    validEmail(email),
    emailAlreadyInUse(email),
    validName(displayName),
    validPassword(password),
  ]);
 
  const invalidFieldsMessage = dataCheck.filter((e) => e !== undefined);

  return invalidFieldsMessage[0];
};

const createNewUser = async (displayName, email, password, image) => {
  const invalidUserMessage = await isUserFieldsInvalid(displayName, email, password);

  if (invalidUserMessage) return { errorMessage: invalidUserMessage };

  const result = await sequelize.transaction(async (t) => {
    const user = await User.create({ displayName, email, password, image }, { transaction: t });

    return user;
  });

  return result;
};

const findUserByEmail = async (email) => {
  const user = User.findOne({ where: { email } });

  return user;
};

const findAllUsers = async () => User.findAll();

const findUserById = async (id) => {
  const user = User.findOne({ where: { id } });

  return user;
};

const deleteUser = async (userId) => {
  const deletedUser = await sequelize.transaction(async (t) => {
    const user = await User.destroy(
      { where: { id: userId } }, 
      { transaction: t },
    );
    return user;
  });
    
  return deletedUser;
};

module.exports = {
  validName,
  validEmail,
  validPassword,
  emailAlreadyInUse,
  createNewUser,
  findUserByEmail,
  findAllUsers,
  findUserById,
  deleteUser,
};

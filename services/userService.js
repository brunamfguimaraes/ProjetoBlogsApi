const { User } = require('../models');
const schema = require('../schemas/userSchema');

const postNewUser = async (displayName, email, password, image) => {
  try {
    const infoValidation = schema.validateNewUser(displayName, email, password);
    if (infoValidation.err) return infoValidation;
    const newUser = await User.create({ displayName, email, password, image });
    return newUser;
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return { err: { message: 'User already registered' }, status: 409 };
    }
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

const listAllUsers = async () => {
  try {
    const allUsers = await User.findAll();
    return allUsers;
  } catch (e) {
    console.log(e.message);
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (user === null) return { err: { message: 'User does not exist' }, status: 404 };
    return user;
  } catch (e) {
    console.log('ERRO NO GET USERBYID', e.message);
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

module.exports = {
  postNewUser,
  listAllUsers,
  getUserById,
};
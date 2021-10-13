const { User } = require('../models');
const generateToken = require('../middlewares/generateToken');

const createUser = async (newUser) => {
  const { displayName, email } = newUser;
  const checkUser = await User.findOne({ where: { email } });
  if (checkUser) return { message: 'User already registered' };
  try {
    const { id } = await User.create(newUser);
    const token = generateToken({ id, displayName, email });
    return token;
  } catch (e) { return { message: '...Something is wrong' }; }
};

module.exports = {
  createUser,
};

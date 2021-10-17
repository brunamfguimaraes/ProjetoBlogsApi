const { User } = require('../models');
const { generateToken } = require('../middlewares/Token');

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

const login = async (user) => {
  const { email, password } = user;
  try {
    const checkUser = await User.findOne({ where: { email, password } });
    if (!checkUser) return { message: 'Invalid fields' };
    const { id, displayName } = checkUser;
    return generateToken({ id, displayName, email });
  } catch (e) {
    return { message: '...Something is wrong' };
  }
};

const deleteUser = async (id) => {
  const setDelete = await User.destroy({
    where: {
      id,
    },
  });
  if (setDelete === 0) return { message: 'Unauthorized user' };
  return true;
};

module.exports = {
  createUser,
  login,
  deleteUser,
};

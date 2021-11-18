const { User } = require('../../../models');

const create = async (data) => {
  const users = await User.create({ data });
  
  return users;
};

const listAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const listUserById = async (id) => {
  const user = await User.findOne({ 
    where: { id },
  });

  return user;
};

const deleteUser = async ({ email }) => {
  await User.destroy({
    where: { email },
  });
};

module.exports = {
  create,
  listAllUsers,
  listUserById,
  deleteUser,
  findByEmail,
};
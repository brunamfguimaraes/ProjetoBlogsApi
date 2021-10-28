const { User } = require('../models');
const { userListService, userDataService, deleteUser } = require('../services/User');

const requestCreateUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const createUser = await User.create({ displayName, email, password, image });

    return res.status(201).json(createUser);
  } catch (e) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const requestUserList = async (_req, res) => {
  const userList = await userListService();

  return res.status(200).json(userList);
};

const requestDataUser = async (req, res) => {
  const { id } = req.params;

  const userData = await userDataService(id);

  if (!userData) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(userData);
};

const requestDeleteUser = async (req, res) => {
  const { userId } = req.user;

  await deleteUser(userId);

  return res.status(204).end();
};

module.exports = {
  requestCreateUser,
  requestUserList,
  requestDataUser,
  requestDeleteUser,
};

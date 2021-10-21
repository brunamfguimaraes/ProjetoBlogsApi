const service = require('../services/Users');

const createUser = async (req, res) => {
  try {
    const user = req.body;

    const newUser = await service.createUser(user);

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const allUsers = await service.getAllUsers();

    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const UserById = await service.getUserById(id);

    return res.status(200).json(UserById);
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedUser = await service.updateUser(name, description, id);

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await service.deleteUser(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

require('dotenv').config();
const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const fields = { displayName, email, password, image };

    const response = await UserService.createUser(fields);

    if (response.message && response.conflict) {
      return res.status(409).json(response);
    }

    if (response.message) {
      return res.status(400).json(response);
    }

    return res.status(201).json({ token: response });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await UserService.getUsers();

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await UserService.getUser(id);

    if (response.message) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req;
    await UserService.deleteUser(userId);

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
};

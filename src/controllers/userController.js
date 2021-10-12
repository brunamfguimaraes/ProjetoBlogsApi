const userService = require('../services/userService');

async function create(req, res) {
  try {
    const { body } = req;
    const { token } = req;

    const newUser = await userService.create(body);
    if (!newUser) {
      return res.status(409).json({ message: 'User already registered' });
    }

    return res.status(201).json({ token });
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

async function getAllUsers(_req, res) {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

async function getUserByID(req, res) {
  try {
    const { id } = req.params;

    const user = await userService.getUserByID(id);
    if (user === null) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  create,
  getAllUsers,
  getUserByID,
};
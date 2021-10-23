const userServices = require('../services/userServices');
require('dotenv');

const createUser = async (req, res) => {
  try {
    const newUser = await userServices.createUser(req.body);
    if (newUser.error) {
      const { status, message } = newUser.error;
      return res.status(status).json({ message });
    }
    res.status(201).json({ ...newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went Wrong. Please Try again');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong. Please try again');
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    if (user.error) {
      const { status, message } = user.error;
      return res.status(status).json({ message });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong. Please try again');
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};

// getAll (findAll)
// getById (findByPk)
// create (create)
// update (update)
// remove (destroy)
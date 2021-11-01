const userServices = require('../services/userServices');
require('dotenv');

const createUser = async (req, res, next) => {
  try {
    const newUser = await userServices.createUser(req.body);
    if (newUser.error) next(newUser);
    res.status(201).json({ ...newUser });
  } catch (error) {
    console.log(error);
    next(500);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(500);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    if (user.error) next(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(500);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};

// getAll (findAll) - OK
// getById (findByPk) - OK
// create (create) - OK
// update (update)
// remove (destroy)
const rescue = require('express-rescue');
// const services = require('../services/Users');

const createUser = rescue(async (_req, _res) => {});

const getAllUsers = rescue(async (_req, _res) => {});

const getUserById = rescue(async (_req, _res) => {});

const updateUser = rescue(async (_req, _res) => {});

const deleteUser = rescue(async (_req, _res) => {});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
const { StatusCodes } = require('http-status-codes');

const ServiceUsers = require('../services/ServiceUsers');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const token = await ServiceUsers.create({ displayName, email, password, image });

    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await ServiceUsers.login({ email, password });

    return res.status(StatusCodes.OK).json(token);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getAllUsers = await ServiceUsers.getAll();

    return res.status(StatusCodes.OK).json(getAllUsers);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getAllUsers = await ServiceUsers.getUserById(id);

    return res.status(StatusCodes.OK).json(getAllUsers);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  login,
  getAll,
  getUserById,
}; 

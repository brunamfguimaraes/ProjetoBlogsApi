const { StatusCodes } = require('http-status-codes');

const ServiceCategories = require('../services/ServiceCategories');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await ServiceCategories.create({ name });

    return res.status(StatusCodes.CREATED).json(newCategory);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getAllCategories = await ServiceCategories.getAll();

    return res.status(StatusCodes.OK).json(getAllCategories);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
};
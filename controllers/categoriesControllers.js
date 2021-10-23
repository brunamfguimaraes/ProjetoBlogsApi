const { StatusCodes } = require('http-status-codes');
const categoriesServices = require('../services/categoriesServices');

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: '"name" is required',
      }); 
    }
    const response = await categoriesServices.addCategory(name);
    if (response) return res.status(201).json(response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await categoriesServices.getAll();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  addCategory,
  getAll,
};
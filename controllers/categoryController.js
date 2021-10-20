const { StatusCodes } = require('http-status-codes');
const { createCategoryServices } = require('../services/categoryServices');

const createCategory = async (req, res) => {
  try {
    const response = await createCategoryServices(req.body.name);
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = { createCategory };
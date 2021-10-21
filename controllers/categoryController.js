// const { StatusCodes } = require('http-status-codes');
const { createCategoryServices } = require('../services/categoryServices');

const createCategory = async (req, res) => {
  try {
    const response = await createCategoryServices(req.body.name);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { createCategory };
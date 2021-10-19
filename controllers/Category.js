const { CREATED, INTERNAL_SERVER_ERROR } = require('http-status');
const { create } = require('../services/Category');

const createCategory = async (req, res) => {
  try {
    const category = await create(req.body);
    if (category.err) {
      return res.status(category.err.status).json({ message: category.err.message });
    }
    res.status(CREATED).json(category);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
};
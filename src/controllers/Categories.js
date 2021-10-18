const { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST } = require('http-status');
const Categories = require('../services/Categories');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await Categories.createCategory(name);

    return result.message
      ? res.status(BAD_REQUEST).json(result)
      : res.status(CREATED).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
};
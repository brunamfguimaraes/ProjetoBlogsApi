const categoriesService = require('../services/categoriesService');

function validateName(req, res, next) {
  try {
    const { name } = req.body;

    const newCategory = categoriesService.validateName(name);
    if (newCategory === null) {
      return res.status(400)
      .json({ message: '"name" is required' });
    }

    next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  validateName,
};
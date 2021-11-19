const { Category } = require('../models');

const nameValidation = async (req, res, next) => {
    const { name } = req.body;

    if (name === '' || !name) {
        return res.status(400).json({ message: '"name" is required' });
    }
    next();
};

const getCategory = async () => {
    const result = await Category.findAll();
    return result;
  };

module.exports = {
    nameValidation,
    getCategory,
};
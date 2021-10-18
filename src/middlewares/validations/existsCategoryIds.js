const { StatusCodes } = require('http-status-codes');
const { Category } = require('../../sequelize/models');

const categoryIdExists = async (req, res, next) => {
  const { categoryIds } = req.body;
  console.log('req ------', req.body);

  const categories = await Category.findAll({ where: { id: categoryIds } });

  if (categories.length !== categoryIds.length) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }

  next();
};

module.exports = categoryIdExists;

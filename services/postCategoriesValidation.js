const { Category } = require('../models');

const BAD_REQUEST = 400;

const titleValidation = (req, res, next) => {
  const { title } = req.body;
  if (!title) res.status(BAD_REQUEST).json({ message: '"title" is required' });
  next();
};

const contentValidation = (req, res, next) => {
  const { content } = req.body;
  if (!content) res.status(BAD_REQUEST).json({ message: '"content" is required' });
    next();
};

const categoryKeyValidation = (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) res.status(BAD_REQUEST).json({ message: '"categoryIds" is required' });
  try {
      categoryIds.forEach(async (category) => {
          const categoryFound = await Category.findByPk(category);
          console.log('Eh isso aqui!!', categoryFound);
          if (!categoryFound) res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
      });
  } catch (error) {
      return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }
  next();
};

module.exports = { titleValidation, contentValidation, categoryKeyValidation };

const { Category } = require('../models');

const BAD_REQUEST = 400;

const titleValidation = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(BAD_REQUEST).json({ message: '"title" is required' });
  }
  next();
};

const contentValidation = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(BAD_REQUEST).json({ message: '"content" is required' });
  }
  next();
};

const categoryKeyValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) {
    return res.status(BAD_REQUEST).json({ message: '"categoryIds" is required' });
  }
  try {
      const categoryFound = categoryIds.map((category) => Category.findByPk(category));
      const solvedPromises = await Promise.all(categoryFound);
      if (solvedPromises.includes(null)) {
         return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
      }
  } catch (error) {
      return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }
  next();
};

module.exports = { titleValidation, contentValidation, categoryKeyValidation };

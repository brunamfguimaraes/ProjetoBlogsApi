const { Category } = require('../models');

const BAD_REQUEST = 400;

const postErrorMessages = {
  titleRequired: () => '"title" is required',
  contentRequired: () => '"content" is required',
  categoryRequired: () => '"categoryIds" is required',
  categoryExistence: () => '"categoryIds" not found',
};

const titleRequired = (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.status(BAD_REQUEST).json(
      {
        message: postErrorMessages.titleRequired(),
      },
    );
  }

  next();
};

const contentRequired = (req, res, next) => {
  const { content } = req.body;

  if (!content) {
    return res.status(BAD_REQUEST).json(
      {
        message: postErrorMessages.contentRequired(),
      },
    );
  }

  next();
};

const categoryRequired = (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    return res.status(BAD_REQUEST).json(
      {
        message: postErrorMessages.categoryRequired(),
      },
    );
  }

  next();
};

const checkCategory = async (req, res, _next) => {
  const { categoryIds } = req.body;

  const categories = await Category.findAll();

  if (!categories.every((el, index) => el.dataValues.id === categoryIds[index])) {
    return res.status(400).json({ message: postErrorMessages.categoryExistence() });
  }

  return res.status(200).json(categories);
};

module.exports = {
  titleRequired,
  contentRequired,
  categoryRequired,
  checkCategory,
};

const { Category, BlogPost } = require('../models');
const { getUserId } = require('../services/BlogPost');

const BAD_REQUEST = 400;
const UNAUTHORIZED_REQUEST = 401;

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

const checkCategory = async (req, res, next) => {
  const { categoryIds } = req.body;

  const categories = await Category.findAll(
    { where: { id: categoryIds } },
  );

  if (categories.length !== categoryIds.length) {
    return res.status(BAD_REQUEST).json({ message: postErrorMessages.categoryExistence() });
  }

  next();
};

const notUpdateCategories = async (req, res, next) => {
  if (req.body.categoryIds) {
    return res.status(BAD_REQUEST).json({ message: 'Categories cannot be edited' });
  }

  next();
};

const checkPostOwner = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { id } = req.params;

    const userId = await getUserId(email);
    const postOwner = await BlogPost.findOne({ where: { userId: id } });

    if (userId === postOwner.userId) {
      next();
    }
  } catch (err) {
    return res.status(UNAUTHORIZED_REQUEST).json({ message: 'Unauthorized user' });
  }
};

module.exports = {
  titleRequired,
  contentRequired,
  categoryRequired,
  checkCategory,
  notUpdateCategories,
  checkPostOwner,
};

const { Category, BlogPost } = require('../models');

const BAD_REQUEST = 400;

const postErrorMessages = {
  titleRequired: () => '"title" is required',
  contentRequired: () => '"content" is required',
  categoryRequired: () => '"categoryIds" is required',
  categoryExistence: () => '"categoryIds" not found',
  categoryCannotBeEdited: () => 'Categories cannot be edited',
  unauthorizedUser: () => 'Unauthorized user',
  postDoesNotExists: () => 'Post does not exist',
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
    return res.status(BAD_REQUEST).json({ message: postErrorMessages.categoryCannotBeEdited() });
  }

  next();
};

const checkPostOwner = async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;

  const postOwner = await BlogPost.findOne({ where: { userId: id } });

  if (userId !== postOwner.userId) {
    return res.status(401).json({ message: postErrorMessages.unauthorizedUser() });
  }

  next();
};

const postDoesNotExists = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPost.findOne({ where: { id } });

  if (!post) {
    return res.status(404).json({ message: postErrorMessages.postDoesNotExists() });
  }

  next();
};

module.exports = {
  titleRequired,
  contentRequired,
  categoryRequired,
  checkCategory,
  notUpdateCategories,
  checkPostOwner,
  postDoesNotExists,
};

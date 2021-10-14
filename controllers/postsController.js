const {
  createNewPost, emptyFields, invalidCategory,
} = require('../services/postsService');

const verifyEmptyFields = async (req, res, next) => {
  try {
    if (!req.body.title) await emptyFields('title');
    if (!req.body.categoryIds) await emptyFields('categoryIds');
    if (!req.body.content) await emptyFields('content');
    next();
  } catch (e) {
      return res.status(400).json({ message: e.message });
    }
};

const checkCategories = async (req, res, next) => {
  const { categoryIds } = req.body;
  const invalid = await invalidCategory(categoryIds);
  if (invalid) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const createPost = async (req, res) => {
  const { id } = req.user;
  const { title, content } = req.body;
  const postId = await createNewPost(title, content, id);
  return res.status(201).json({ id: postId, userId: id, title, content });
};

module.exports = { createPost, verifyEmptyFields, checkCategories };

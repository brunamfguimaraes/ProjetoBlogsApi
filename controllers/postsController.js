const {
  createNewPost, emptyFields, invalidCategory, allPosts, onePost,
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

const getAllPosts = async (_req, res) => {
  const posts = await allPosts();
  return res.status(200).json(posts);
};

const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await onePost(id);
    return res.status(200).json(post);
  } catch (error) {
      return res.status(404).json({ message: error.message });
    }
};

module.exports = {
  createPost, verifyEmptyFields, checkCategories, getAllPosts, getOnePost,
};

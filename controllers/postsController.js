const {
  createNewPost,
  emptyFields,
  invalidCategory,
  allPosts,
  onePost,
  postUpdater,
  destroyPost,
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

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const newPost = await postUpdater(id, title, content);
  return res.status(200).json(newPost);
};

const verifyEmptyField = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (categoryIds) {
      return res.status(400).json({ message: 'Categories cannot be edited' });
  }
  try {
    if (!title) await emptyFields('title');
    if (!content) await emptyFields('content');
    next();
  } catch (e) {
      return res.status(400).json({ message: e.message });
    }
};

const validateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await onePost(id);
    const { id: userId } = req.user;
    if (post.userId !== userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
  next();
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await destroyPost(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  verifyEmptyFields,
  verifyEmptyField,
  checkCategories,
  getAllPosts,
  getOnePost,
  updatePost,
  validateUser,
  deletePost,
};

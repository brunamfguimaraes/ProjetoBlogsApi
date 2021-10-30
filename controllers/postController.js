const {
  validateCreatePost,
  validateFindPost,
  validateFindPostById,
  validateUpdatePost,
  validateDeletePost,
} = require('../services/postService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  const create = await validateCreatePost({ title, content, userId, categoryIds });
  const { id, code, message } = create;
  if (message) {
    return res.status(code).json({ message });
  }
  
  return res.status(201).json({ id, userId, title, content });
};

const findPost = async (_req, res) => {
  const find = await validateFindPost();
  return res.status(200).json(find);
};

const findPostById = async (req, res) => {
  const { id } = req.params;
  const findById = await validateFindPostById(id);
  const { code, message } = findById;
  if (message) {
    return res.status(code).json({ message });
  }

  res.status(200).json(findById);
};

const postUpdate = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { categoryIds, title, content } = req.body;
  if (categoryIds) {
    return res.status(400).send({ message: 'Categories cannot be edited' });
  }

  const update = await validateUpdatePost(id, { title, content }, userId);
  const { code, message } = update;
  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(200).json(update);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const result = await validateDeletePost(id, userId);

  return res.status(204).json(result);
};

module.exports = {
  createPost,
  findPost,
  findPostById,
  postUpdate,
  deletePost,
};
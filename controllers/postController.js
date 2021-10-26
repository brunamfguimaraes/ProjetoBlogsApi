const {
  validateCreatePost,
  validateFindPost,
  validateFindPostById,
  validateUpdatePost,
} = require('../services/postService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  console.log(req.user);
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
  const { title, content } = req.body;
  const update = await validateUpdatePost({ id, title, content });
  return res.status(200).json(update);
};

module.exports = {
  createPost,
  findPost,
  findPostById,
  postUpdate,
};
const { validateCreatePost } = require('../services/postService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  console.log(userId);
  const create = await validateCreatePost({ title, content, userId, categoryIds });
  const { id, code, message } = create;
  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(201).json({ id, userId, title, content });
};

module.exports = {
  createPost,
};
const { createNewPost } = require('../services/postsService');

const createPost = async (req, res) => {
  const { id } = req.user;
  const { title, content } = req.body;
  const postId = await createNewPost(title, content, id);
  return res.status(201).json({ id: postId, userId: id, title, content });
};

module.exports = { createPost };

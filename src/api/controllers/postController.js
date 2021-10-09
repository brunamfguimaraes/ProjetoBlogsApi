const rescue = require('express-rescue');
const { createPostService } = require('../service/postService');

const createPost = rescue(async (req, res) => {
  const { id: userId } = req.user;
  const body = { ...req.body, userId };
  const posts = await createPostService(body);
  return res
    .status(201)
    .json({ id: posts.id, userId, title: posts.title, content: posts.content });
});

module.exports = {
  createPost,
};
